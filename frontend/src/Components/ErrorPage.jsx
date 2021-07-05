import { Container, Row, Col } from "react-bootstrap";
import '../css_files/errpage.css';
import Header from './Header';
import Footer from './Footer';

//For parallax
import img1 from '../img/1112.png';
import { Parallax } from 'react-parallax';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const ErrorPage = () => {
    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '140%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={550}
            >
            <Container fluid>
                <Row>
                    <Col className="Err-body">
                        
                        <h1>No Data Available !!!</h1>    
                        <hr/>
                        <br />
                        <br />
                        <h3>Go back to Home Page !!!</h3>
                    </Col>
                </Row>
            </Container>
            </Parallax>
            <Footer/>
        </>
    )
}
export default ErrorPage;