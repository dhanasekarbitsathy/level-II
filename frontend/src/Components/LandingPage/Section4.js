import React from 'react'
import './Section4.css'
import img from '../../assests/sec4.png'

function Section4() {
  return (
    <div>
      <div className='find-more-jobs'>
        <button>Find More Jobs</button>
      </div>
      <div className='sec-4-img'>
          <img src={img} alt='loading..'
          onClick={()=>alert('hi upload your resume')}
          />
      </div>
    </div>
  )
}

export default Section4