import { Container, Row, Col } from "react-bootstrap";
import '../css_files/orderplaced.css';
import Header from './Header';
import Footer from './Footer';
const OrderPlaced = () => {
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col className="order-placed">
                        <h1 >Thanks your order has been placed successfully</h1>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
export default OrderPlaced;