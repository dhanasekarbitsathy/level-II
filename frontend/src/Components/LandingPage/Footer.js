import React from 'react'
import './Footer.css'
import saf from '../../assests/Gt.png'

function Footer() {
  return (
    <div className='submit'>
      <div className='footer-box'>
        <div>
          <h1>Never Want to  Miss<br /> Any Job News</h1>
        </div>
        <div>
          <input type='text' placeholder='enter data' />
          <button>Suscribe</button>
        </div>
      </div>
      
      <div className='foots-box'>
        <div>
          <img src={saf} alt='' />
        </div>
        <div>
          <h5>About</h5>
        </div>
        <div>
          <h5>Jobs</h5>
        </div>
        <div>
          <h5>Contact Us</h5>
        </div>
        <div>
          <h5>Terms</h5>
        </div>
        <div>
          <h5>PrivacyPolicy</h5>
        </div>
      </div>
      
    </div>
  )
}

export default Footer