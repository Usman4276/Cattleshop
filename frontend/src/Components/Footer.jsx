import { Container, Row, Col } from "react-bootstrap"
import '../css_files/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <Container fluid className="my_container" >
                <Row className="my_row">
                    <Col xs={12} sm={6} md={4} lg={3} className="my_col">

                        <p>Customer Care</p>
                        <ul>
                            <li><Link  to="/help">Help Center</Link></li>
                            <li><Link  to="/howtobuy">How to buy</Link></li>
                            <li><Link  to="/trackyourorder">Track your order</Link></li>
                            <li><Link  to="/purchaseprotection">Purchase Protection</Link></li>
                            <li><Link  to="/contactus">Contact us</Link></li>
                        </ul>

                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my_col">

                        <p>Cattle Shop</p>
                        <ul>
                            <li><Link  to="/aboutus">About us</Link></li>
                            <li><Link  to="/privacy&policy">Privacy Policy</Link></li>
                            <li><Link  to="/digital-payment">Digital Payment</Link></li>
                            <li><Link  to="/termsconditions">Terms & Conditions</Link></li>
                        </ul>

                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2} className="my_col" id="id_col3">

                        <p>Make Money With us</p>
                        <ul>
                            <li><Link  to="/register">Sell on Cattle Shop</Link></li>
                        </ul>

                    </Col>
                    <Col xs={12} sm={6} md={12} lg={4} className="my_col" id="id_social">

                        <p>Join us</p>
                        <ul className="my_social">
                            <li><a className="fa fa-facebook fa-2x" href="https://www.facebook.com/University.Lahore/" /></li>
                            <li><a className="fa fa-twitter fa-2x" href="https://twitter.com/ULahore?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" /></li>
                            <li><a className="fa fa-instagram fa-2x" href="https://www.instagram.com/ulahore/?hl=en" /></li>
                        </ul>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer;