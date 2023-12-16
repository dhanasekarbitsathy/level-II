import { Grid, Typography } from "@mui/material";
import React from "react";
import marketing from "../../assests/marketing.png"
import design from "../../assests/Design.png"
import human from "../../assests/Human.png"
import finance from "../../assests/Finance.png"
import gov from "../../assests/Government.png"
import business from "../../assests/Business.png"
import customer from "../../assests/Customer.png"
import pro from "../../assests/Project.png"
import Card from "../common/Card";
const cards = [
  {
    title: "Marketing & Communication",
    avalableJobs: 237,
    img: marketing,
  },
  {
    title: "Design & Development",
    avalableJobs: 237,
    img: design,
  },
  {
    title: "Human Research & Development",
    avalableJobs: 237,
    img: human,
  },
  {
    title: "Finance Managment",
    avalableJobs: 237,
    img: finance,
  },
  {
    title: "Government Jobs",
    avalableJobs: 237,
    img: gov,
  },
  {
    title: "Business & Consulting",
    avalableJobs: 237,
    img: business,
  },
  {
    title: "Customer Support Care",
    avalableJobs: 237,
    img: customer,
  },
  {
    title: "Project Management",
    avalableJobs: 237,
    img: pro,
  },
];

function Section2() {
  return (
    <Grid container
    sx={{
        backgroundColor:"F6F7FC"
    }}
    >
      <Typography variant="h4" sx={{
        fontWeight: 700,
        textAlign: "center", width: "100vw", paddingTop: "20px", paddingBottom: "50px"
      }}>
        One Platform<br/> Many Solutions
      </Typography>
      <Grid
        container
        sx={{
          margin: "auto",
          justifyContent: "center",
        }}
      >
        {cards.map((card, i) => {
          return <Card key={i} card={card} />;
        })}
      </Grid>
    </Grid>
  );
}

export default Section2;
