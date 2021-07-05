import Header from './Header';
import { Container, Row, Col } from "react-bootstrap";
import '../css_files/terms.css';
import Footer from './Footer';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const TermsConditions = () => {
    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '100%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            <Container fluid>
            <div className="TAC-body">
            <h1 className="HTB-headings-h1">Terms & Conditions</h1>
            <hr/>
            <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <Row>
                    <div id="mylist">
                            <ul class="tca" >
                                <li id="list1"><p className="htb-para">We are an online marketplace. By using the Site, you accept the terms and conditions and represent 
                                that you agree to comply with the terms and conditions. All the terms & conditions are
                                deemed effective upon your use of the Site which signifies your acceptance of these terms. If you do not agree to be bound by terms & cnditions please do not access, register with 
                                or use this Site.</p></li>
                                <li id="list1"><p className="htb-para">The site provides a platform for users to buy, sell and share their cattles with the community.
                                </p></li>
                                <li id="list1"><p className="htb-para">You acknowledge and agree that you are solely responsible for your own content posted on the Cattle Shop and the consequences of posting or publishing it.
                                </p></li>
                                <li id="list1"><p className="htb-para">Cattle Shop does not permit copyright infringing activities.</p></li>
                                <li id="list1"><p className="htb-para">We are not responsible for the prices quoted by suppliers or consultants on this app.
                                </p></li>
                                <li id ="list1"><p className="htb-para">Cattle Shop reserves the right to delete any user from the app or limit their access.
                                </p></li>
                              <li id ="list1"><p className="htb-para">The Site reserves the right to change, modify, add, or remove portions of these Terms and Conditions at any time without any prior notification.
                               Changes will be effective when posted on the Site with no other notice provided. Please check these Terms and Conditions regularly for updates.</p></li>
                            </ul>
                    </div>
                </Row>
                </AnimationOnScroll>
            </div>
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default TermsConditions;