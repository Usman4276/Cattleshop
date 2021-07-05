import { Row, Col, Image, Container } from "react-bootstrap";
import '../css_files/home.css';
import Header from './Header';
import Footer from './Footer';
import Sliderahs from './Slider';
import CardA from './Card';
import React, {useEffect} from 'react';
import { Parallax } from 'react-parallax';
import img1 from '../img/new2.jpg';
import img2 from '../img/1112.png';
import { useContext } from 'react';
import { CustomerIdTransfer, ConsultantIdTransfer, CattleIdContext } from './App';
import note from '../img/note.png'

//for slider
import img4 from '../img/cow.jpg';
import img5 from '../img/goat.jpg';
import img6 from '../img/sheep.jpg';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const inlineStyle1 = {
    left: '50%',
    top: '50%',
    position: 'absolute',
    transform: 'translate( -50%, -50%)',
}

const Home = () => {
    useEffect(()=>  {
        window.scrollTo(0, 0);
      },[]);

    return (
        <div style={{textAlign: 'center', opacity: '1'}}>
            <Header/>
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '100%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={550}
            >
            <Container>
                <div className="homep">
                
                    <div className="first-Heading">

                    <AnimationOnScroll animateIn="animate__fadeInRight">
                        <h1 className="headingtextcattle">Cattle</h1>
                        <h4 className="headingtextshop">Shop</h4>
                    </AnimationOnScroll>
                        
                    </div>
            
                    <div className="scroll-downs">
                        <div className="mousey">
                            <div className="scroller"></div>
                        </div>
                    </div>
                
                </div>
            </Container>
            </Parallax>
            <Parallax 
            bgImage={img2}
            bgImageStyle={{height: '100%', maxWidth: '100%', opacity: '0.50'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
                <div >
                <div style={{height:'10vh'}}></div> 
                
                <div className="H-Headings">
                <h1 className="H-headings-h1">Events</h1>
                <hr/>
                <div className="H-Slider">
                <AnimationOnScroll animateIn="animate__fadeIn">
                    <Sliderahs
                        image1={img4}
                        image2={img5}
                        image3={img6}
                        
                    />
                </AnimationOnScroll>
                </div>
                
                </div>

                <div className="Home-About-us-container">
                <h1 className="H-headings-h1">About Us</h1>
                <hr/>
                <AnimationOnScroll animateIn="animate__fadeIn">
                <Row>
                
                    <Col>
                    <p id="para" >Cattle Shop provides a platform available 
                    for sale & purchase of your cattles online throughout the year. This website
                     has a very friendly interface and allows you to choose your cattle according
                      to pricing and type. Our popular cattles includes Goat, Sheep, Dumba, Cow, 
                      Bull, Camel and Buffalo.</p>
                    
                    </Col>
                    
                </Row>

                
                <Row className="HAU-box">
                    <Col xs={12} sm={6} md={4} lg={4} className="home-acol">
                    <Image src={note} id="pic1"/>
                        <h6>Sell on Cattle Shop</h6>
                    <div>
                        <li >Upload your cattle within seconds</li>
                        <li>Sell your cattles at the best marketplace.</li>
                        <li>Get genuine offers from verified suppliers</li>
                    </div>
                    </Col>

                    <Col xs={12} sm={6} md={4} lg={4} className="home-acol2">
                        <Image src={note} id="pic1"/>
                        <h6>Earn from Cattle Shop</h6>
                        <div>
                        <li >Our consultants will help you to make decision about cattles.</li>
                        <li>Consultant will receive the adequate salary for his work.</li>
                        </div>
                    </Col>

                    <Col xs={12} sm={6} md={4} lg={4} className="home-acol3">
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
            
                </div>
                <div style={{height:'10vh'}}></div> 
                
            </Parallax>
            <Footer/>
        </div>
    )
}
export default Home;