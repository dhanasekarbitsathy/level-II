import React from 'react'
import get from '../../assests/Finance.png'
import './Resume.css'

let res = [
    {
        img: get,
        company: 'Microsoft',
        intern: 'Freelance',
        heading: 'Senior UI Designer',
        jobtype: 'Fulltime',
        text: "Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and ",
        income: '2500',
    },
   
]

function Resume() {
    return (
        <>
            {
                res.map((map) => {
                    return (
                        <div className='resume-container'>
                            <div className='company'>
                                <div className='company-img'>
                                    <img src={map.img} alt='loading...'/>
                                </div>
                                <div className='company-text'>
                                    <div>
                                        <h5>{map.company}</h5>
                                    </div>
                                    <div className='intern'>
                                        <p>{map.intern}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='jobheading'>
                                <h1>{map.heading}</h1>
                                <h6>{map.jobtype}</h6>
                            </div>
                            <div className='job-des'>
                                <p>{map.text}</p>
                            </div>
                            <div className='job-inc'>
                                <div>
                                        <p>${map.income}/month</p>
                                </div>
                                <div>
                                        <button>Apply Now</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Resume