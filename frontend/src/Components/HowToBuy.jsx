import Header from './Header';
import { Container, Row, Col } from "react-bootstrap";
import '../css_files/howtobuy.css';
import Footer from './Footer';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1111.jpg';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const HowToBuy = () => {
    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '150%', maxWidth: '150%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            <Container fluid >
            <div className="HTB-body">
            <h1 className="HTB-headings-h1">How to buy</h1>
            <hr/>
            <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <Row>
                    <Col>
                    <div id="mylisthtb">
                            <ul class="tcahtb" >
                                <li id="list1htb"><p className="htb-para">First Select the type of Cattle from drop down or Search for the Type of Cattle you want.</p></li>
                                <li id="list1htb"><p className="htb-para">Read the details and if you are satisfied Click buy now to buy Cattle or Add to Cart if you want to continue Shopping.</p></li>
                                <li id="list1htb"><p className="htb-para">Now, Select our trusted Consultant (Consultants help Customers in Inspection and Buying Process) and Pick & Drop service (To Pick up the Cattle and Deliver to your location) and click Next.</p></li>
                                <li id="list1htb"><p className="htb-para">Now Chose the Payment method and place the Order.</p></li>
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
export default HowToBuy;