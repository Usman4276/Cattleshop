import Header from './Header';
import { Container, Row, Col } from "react-bootstrap";
import '../css_files/purchaseprotection.css';
import Footer from './Footer';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1111.jpg';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';


const PurchaseProtection = () => {
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
            <div className="PP-body">
            <h1 className="PP-headings-h1">Purchase Protection</h1>
            <hr/>
            <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <Row>
                    <Col>
                    <div id="mylistpp">
                            <ul class="tcapp" >
                                <li id="list1pp"><p className="htb-para">Our Puchasing method is well thought to prevent any Scams and Theft.</p></li>
                                <li id="list1pp"><p className="htb-para">Through Online payment buyer only Pays to the Admin not directlly to the Seller. This is a safe guard for some scams.</p></li>
                                <li id="list1pp"><p className="htb-para">Online payment is done through Jazz cash and Easypaisa for added Protection.</p></li>
                                <li id="list1pp"><p className="htb-para">Cash on Delivery is only Handeled by our Trusted personal only.</p></li>
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
export default PurchaseProtection;