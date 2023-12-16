import React from 'react'
import './Section3.css'
import Resume from './Resume'

function Section3() {
  return (
    <div className='featured-container'>
      <h1>Featured Job Circulars</h1>
      <div className='resume-containerr'>
        <Resume/>
        <Resume/>
        <Resume/>
        <Resume/>
        <Resume/><Resume/>
        
      </div>
    </div>
  )
}

export default Section3