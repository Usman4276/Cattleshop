import { Container, Row, Col, Image } from "react-bootstrap";
import '../css_files/about.css';
import Header from './Header';
import note from '../img/note.png'
import Footer from './Footer';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const AboutUs = () => {
    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '150%', maxWidth: '150%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            <Container>
            <div className="About-us-container">
                <Row>
                
                    <Col>
                    <h1>About Us</h1>
                    <hr/>
                    <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                    <p id="para" >Cattle Shop provides a platform available 
                    for sale & purchase of your cattles online throughout the year. This website
                     has a very friendly interface and allows you to choose your cattle according
                      to pricing and type. Our popular cattles includes Goat, Sheep, Dumba, Cow, 
                      Bull, Camel and Buffalo.</p>
                    </AnimationOnScroll>
                    </Col>
                    
                </Row>

                <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <Row className="AU-box">
                    <Col>
                    <Image src={note} id="pic1"/>
                        <h6>Sell on Cattle Shop</h6>
                    <div>
                        <li >Upload your cattle within seconds</li>
                        <li>Sell your cattles at the best marketplace.</li>
                        <li>Get genuine offers from verified suppliers</li>
                    </div>
                    </Col>

                    <Col>
                        <Image src={note} id="pic1"/>
                        <h6>Earn from Cattle Shop</h6>
                        <div>
                        <li >Our consultants will help you to make decision about cattles.</li>
                        <li>Consultant will receive the adequate salary for his work.</li>
                        </div>
                    </Col>

                    <Col>
                    <Image src={note} id="pic1"/>
                        <h6>Pick & Drop Service Providers</h6>
                        <div>
                        <li>Pick & Drop Service Providers will deliver the cattles to the respected customer.</li>
                        <li>Pick & Drop Service Providers will get the proper salary for their work</li>
                        </div>
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
export default AboutUs;