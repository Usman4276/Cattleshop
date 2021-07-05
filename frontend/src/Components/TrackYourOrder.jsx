import Header from './Header';
import { Container, Row, Col } from "react-bootstrap";
import '../css_files/track.css';
import Footer from './Footer';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1111.jpg';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const TrackYourOrder = () => {
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
            <div className="TYO-body">
            <h1 className="HTB-headings-h1">Track Your Order</h1>
            <hr/>
            <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <Row>
                    <Col>
                    <div id="mylistTYO">
                            <ul class="tcatyo" >
                                <li id="list1tyo"><p className="htb-para">During buying process if the Customer has selected our Trusted Pick & Drop service, then Customer will be provided with a contact of the Delivery Service.</p></li>
                                <li id="list1tyo"><p className="htb-para">The Delivery Service will contact with Seller to pick up the Ordered Cattle and Contact the Customer for Delivery Location to Deliver Cattle to the Customer.</p></li>
                                </ul>
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
export default TrackYourOrder;