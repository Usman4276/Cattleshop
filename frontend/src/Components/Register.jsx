import Header from './Header';
import Button from 'react-bootstrap/esm/Button'
import '../css_files/register.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import { Parallax } from 'react-parallax';
import Cards from './Cards';

//images imported here
import img1 from '../img/1111.jpg';
import imgcustomer from '../img/customer-register.png';
import imgsupplier from '../img/suppliers-register.jpg';
import imgConsultant from '../img/Consultant-register.png';
import imgpickanddrop from '../img/pickup-point.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Register = () => {
  return (
    <>
      <Header />
      <Parallax
      bgImage={img1}
            bgImageStyle={{height: '210%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={600}>
      <div className="Register_body">
      <br/>
      <h1 className="R-headings-h1">Registerations</h1>
      <hr/>
      <div class="Cards-div">
      <Row>
          <AnimationOnScroll animateIn="animate__fadeIn">
          <Col xs={12} sm={6} md={4} lg={4}><Cards 
          Title='Customer Registeration'
          Des=''
          Image={imgcustomer}
          goto='/customer-registration'/>
          </Col>
          </AnimationOnScroll>

          <AnimationOnScroll animateIn="animate__fadeIn">
          <Col xs={12} sm={6} md={4} lg={4}><Cards 
          Title='Supplier Registeration'
          Des=''
          Image={imgsupplier}
          goto='/supplier-registration'/></Col>
          </AnimationOnScroll>

          <AnimationOnScroll animateIn="animate__fadeIn">
          <Col xs={12} sm={6} md={4} lg={4}><Cards 
          Title='Consultant Registeration'
          Des=''
          Image={imgConsultant}
          goto='/consultant-registration'/></Col>
          </AnimationOnScroll>

          <AnimationOnScroll animateIn="animate__fadeIn">
          <Col xs={12} sm={6} md={4} lg={4}><Cards 
          Title='Pick and Drop Registeration'
          Des=''
          Image={imgpickanddrop}
          goto='/pick-and-drop-registration'/></Col>      
          </AnimationOnScroll>          
      </Row>

      </div>
      <div className="R-button">
      <AnimationOnScroll animateIn="animate__fadeIn">
      <h5>OR</h5>
      <Link to="/login" ><Button>Already have an account</Button></Link>
      </AnimationOnScroll>
      </div>
      </div>
      </Parallax>
      <Footer />
    </>
  )
}
export default Register;