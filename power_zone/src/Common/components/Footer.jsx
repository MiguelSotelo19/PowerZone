import 'bootstrap/dist/css/bootstrap.min.css';

//Imágenes
import facebook from '../img/facebook.png'
import instagram from '../img/instagram.png'
import twitter from '../img/twitter.png'
import Gmail from '../img/mail.png'
import derecho_c from '../img/derecho_c.png'

function Footer() {
  return (
    <>
      <div className='d-flex justify-content-between' style={{ backgroundColor: 'rgb(228, 228, 228)', padding: '4vh', marginTop: '12vh' }} >
        <div className='fw-bold fs-4' style={{ marginLeft: '10vh' }}>
            <img 
                src={derecho_c}
                alt='derecho_c'
                className='me-3'
                draggable="false"
                style={{ width: '4vh', height: 'auto' }}
            />
            PowerZone</div>
        <div>
            <img 
                src={facebook}
                alt='Facebook'
                className='me-4'
                draggable="false"
                style={{ width: '4vh', height: 'auto' }}
            />
            <img 
                src={instagram}
                alt='Instagram'
                className='me-4'
                draggable="false"
                style={{ width: '4vh', height: 'auto' }}
            />
            <img 
                src={twitter}
                alt='Twitter'
                className='me-4'
                draggable="false"
                style={{ width: '4vh', height: 'auto' }}
            />
            <img 
                src={Gmail}
                alt='Gmail'
                className='me-4'
                draggable="false"
                style={{ width: '4vh', height: 'auto' }}
            />
        </div>
      </div>
    </>
  );
}

export default Footer; 