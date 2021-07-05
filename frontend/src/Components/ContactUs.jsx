import { Container, Row, Col, Image} from "react-bootstrap";
// import { Text } from "react";
import '../css_files/contact.css';
import Header from './Header';
import Footer from './Footer';
import pic  from "../img/pic.png";
import pic2 from "../img/pngegg.png";
import pic3 from "../img/Unimap.png";

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1111.jpg';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const ContactUs=()=>{
    return(
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '110%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            <Container fluid >
            <div className="CU-body">
            <h1>Contact Us</h1>
            <hr/>
            <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <Row>
                    <Col>
                     
                        <Image src={pic} id="image1"/>
                        
                        <p className="tx1">Email</p>
                        <p className="tx2">CattleShopadmin@gmail.com<br/>
                        Contact with a member of our in-house team.</p>
                                
                     </Col>
                
                    <Col>
                     
                        <Image src={pic2} id="image2"/>
                        
                        <p className="tx2">+92 3xx xxxxxxx<br/>
                        Contact with a member of our in-house team.</p>
                                
                     </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Visit us</h1>
                        <Image src={pic3} id="image3"/>
                    </Col>
                </Row>
            </AnimationOnScroll>    
            </div>    
            </Container>
            </Parallax>
            <Footer />        
        </>
    )
}
export default ContactUs;