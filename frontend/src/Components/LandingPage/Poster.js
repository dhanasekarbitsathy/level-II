import React from 'react'
import "./Poster.css"
import job from '../../assests/Job.png'
import get from '../../assests/Get.png'

function Poster() {
  return (
    <div className="poster-container">
        <div className='poster-container2'>
            <div className='job-img'>
                    <img src={job} alt='loading...'/>
            </div>
            <div className='poster-text-container'>
                <div className='get-img'>
                    <img src={get} alt='loading...'/>
                </div>
                <div className='poster-text'>
                    <p>786 jobs & 110 candidates are <br/>registered</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Poster