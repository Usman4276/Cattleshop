import Header from './Header';
import { Container, Row, Col, Image } from "react-bootstrap";
import '../css_files/digitalpayment.css';
import Footer from './Footer';
import pic  from "../img/easypaisa.png";
import pic2 from "../img/jazzcash.png";

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1111.jpg';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const DigitalPayment = () => {
    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '110%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            <Container fluid >
            <div className="DP-body">
            <h1 className="HTB-headings-h1">Digital Payment</h1>
            <hr/>
            <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <Row>
                    <Col>
                     
                        <Image src={pic} id="image1dp"/>
                        
                        <p className="tx2dp">+92 3xx xxxxxxx<br/>
                        Contact with a member of our in-house team.</p>
                                
                     </Col>
                
                    <Col>
                     
                        <Image src={pic2} id="image2dp"/>
                        
                        <p className="tx2dp">+92 3xx xxxxxxx<br/>
                        Contact with a member of our in-house team.</p>
                                
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
export default DigitalPayment;