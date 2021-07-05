import { Container, Row ,Col } from "react-bootstrap";
import '../css_files/selloncs.css';
import Header from './Header';
import Footer from './Footer';

const SellOnCattleShop=()=>{
    return(
        <>
            <Header/>
            <Container fluid>
                <Row>
                    <Col className="my_body">
                        <h1>sell on cattle shop page</h1>
                    </Col>
                </Row>
            </Container>
            <Footer/>        
        </>
    )
}
export default SellOnCattleShop;