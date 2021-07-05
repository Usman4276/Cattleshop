import { Container, Row, Col, Button, Image } from "react-bootstrap";
import '../css_files/selloncs.css';
import Header from './Header';
import Footer from './Footer';
import StripeCheckout from 'react-stripe-checkout';
import { Total_Amount_Procced } from './App';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import imgStripe from '../img/stripe-card.png';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const StripePayment = () => {

    //Context api with useReducer
    const { Total_Amount_Procced_State } = useContext(Total_Amount_Procced);

    //Getting localStorage data
    const mylstate = localStorage.getItem('lstate');

    const history = useHistory();
    
    // console.log(Total_Amount_Procced_State);
    // console.log(mylstate);

    //Sending payment to backend
    const makePayment = async token => {

        //Converting PKR amount to USD dollars
        let Amount = Math.floor(Total_Amount_Procced_State / 156);

        await fetch('/stripe-pay', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token, Amount
            })
        }).then((res) => {
            // console.log(res);
            history.push('/order-placed');
        }).catch((err) => {
            // console.log(err);
        })
    }

    return (
        <>
            <Header />
            <Parallax
                bgImage={img1}
                bgImageStyle={{ height: '210%', maxWidth: '150%', opacity: '0.90' }}
                blur={{ min: -1, max: 1 }}
                strength={500}
            >
            <Container fluid>
                <Row>
                    <Col className="stripe-payment">
                        <Row>
                            <Image className="stripe-img" src={imgStripe}/>
                        </Row>
                        
                        <StripeCheckout

                            name='Buy Cattle'
                            stripeKey="pk_test_51J9TBbLnZ7JeDDz1b6RVihAnnR4bco6qIBOTIEvdkqhq6C5DNt8A05dATlfA9I8FtcuLJt0qar2DmvynuOMsWMdp00Zlrc2kKg"
                            token={makePayment}
                        >
                        <Row>
                            <Button variant='outline-info'  className="stripe-align-btn">Click to Pay</Button>
                        </Row>
                            

                        </StripeCheckout>
                    </Col>
                </Row>
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default StripePayment;