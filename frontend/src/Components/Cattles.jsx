import Header from './Header';
import { Container, Row ,Col } from "react-bootstrap"
import Footer from './Footer';
import '../css_files/cattles.css';
const Cattles = () => {
    return (
        <>
            <Header/>
            <Container fluid>
                <Row>
                    <Col className="my_body">
                        <h1>Cattles page</h1>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
export default Cattles;