const Relationship = require("../models/relationship.model");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
const mongoose = require("mongoose");

dayjs.extend(duration);

const getPublicUsers = async (req, res) => {
  try {
    const userId = req.userId;

    const followingIds = await Relationship.find({ follower: userId }).distinct(
      "following"
    );

    const userIdObj = mongoose.Types.ObjectId(userId);

    const excludedIds = [...followingIds, userIdObj];

    const usersToDisplay = await User.aggregate([
      {
        $match: {
          _id: { $nin: excludedIds },
          role: { $ne: "moderator" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          avatar: 1,
          location: 1,
        },
      },
      {
        $lookup: {
          from: "relationships",
          localField: "_id",
          foreignField: "following",
          as: "followers",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          avatar: 1,
          location: 1,
          followerCount: { $size: "$followers" },
        },
      },
      {
        $sort: { followerCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json(usersToDisplay);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};


const getPublicUser = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const id = req.params.id;

    const user = await User.findById(id).select(
      "-password -email -savedPosts -updatedAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const totalPosts = await Post.countDocuments({ user: user._id });
    const communities = await Community.find({ members: user._id })
      .select("name")
      .lean();

    const currentUserCommunities = await Community.find({
      members: currentUserId,
    })
      .select("_id name")
      .lean();

    const userCommunities = await Community.find({ members: user._id })
      .select("_id name")
      .lean();

    const commonCommunities = currentUserCommunities.filter((comm) => {
      return userCommunities.some((userComm) => userComm._id.equals(comm._id));
    });

    const isFollowing = await Relationship.findOne({
      follower: currentUserId,
      following: user._id,
    });

    const followingSince = isFollowing
      ? dayjs(isFollowing.createdAt).format("MMM D, YYYY")
      : null;

    const last30Days = dayjs().subtract(30, "day").toDate();
    const postsLast30Days = await Post.aggregate([
      { $match: { user: user._id, createdAt: { $gte: last30Days } } },
      { $count: "total" },
    ]);

    const totalPostsLast30Days =
      postsLast30Days.length > 0 ? postsLast30Days[0].total : 0;

    const responseData = {
      name: user.name,
      avatar: user.avatar,
      location: user.location,
      bio: user.bio,
      role: user.role,
      interests: user.interests,
      totalPosts,
      communities,
      totalCommunities: communities.length,
      joinedOn: dayjs(user.createdAt).format("MMM D, YYYY"),
      totalFollowers: user.followers?.length,
      totalFollowing: user.following?.length,
      isFollowing: !!isFollowing,
      followingSince,
      postsLast30Days: totalPostsLast30Days,
      commonCommunities,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while retrieving the user",
    });
  }
};


const followUser = async (req, res) => {
  try {
    const followerId = req.userId;
    const followingId = req.params.id;

    const relationshipExists = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });

    if (relationshipExists) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    await Promise.all([
      User.findByIdAndUpdate(
        followingId,
        { $addToSet: { followers: followerId } },
        { new: true }
      ),
      User.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: followingId } },
        { new: true }
      ),
    ]);

    await Relationship.create({ follower: followerId, following: followingId });

    res.status(200).json({
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while following the user",
    });
  }
};


const unfollowUser = async (req, res) => {
  try {
    const followerId = req.userId;

    const followingId = req.params.id;

    const relationshipExists = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });

    if (!relationshipExists) {
      return res.status(400).json({
        message: "Relationship does not exist",
      });
    }
    await Promise.all([
      User.findByIdAndUpdate(
        followingId,
        { $pull: { followers: followerId } },
        { new: true }
      ),
      User.findByIdAndUpdate(
        followerId,
        { $pull: { following: followingId } },
        { new: true }
      ),
    ]);

    await Relationship.deleteOne({
      follower: followerId,
      following: followingId,
    });

    res.status(200).json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while unfollowing the user",
    });
  }
};


const getFollowingUsers = async (req, res) => {
  try {
    const relationships = await Relationship.find({
      follower: req.userId,
    })
      .populate("following", "_id name avatar location")
      .lean();

    const followingUsers = relationships
      .map((relationship) => ({
        ...relationship.following,
        followingSince: relationship.createdAt,
      }))
      .sort((a, b) => b.followingSince - a.followingSince);

    res.status(200).json(followingUsers);
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while retrieving the following users",
    });
  }
};

module.exports = {
  getPublicUsers,
  followUser,
  getPublicUser,
  unfollowUser,
  getFollowingUsers,
};
