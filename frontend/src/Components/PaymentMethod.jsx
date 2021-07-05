import Header from './Header';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import '../css_files/paymentmethod.css';
import Footer from './Footer';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cards from './Cards';
import imgjc from '../img/jazzcash-p.jpg';
import imgep from '../img/easypaisa-p.png';
import imgstripe from '../img/Stripe.jpg';
import imgcod from '../img/cashondelivery.jpg';
import { Link } from 'react-router-dom';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const PaymentMethod = () => {

    //useStates
    const [CustomerReq_data, setCustomerReq_data] = useState([]);

    //Getting values from localstorage
    const cattle_id = localStorage.getItem('CattleId');

    //useHistory
    const history = useHistory();

    //Global variables
    let Buy_now_cattle_id;
    let cattle_status = 'out';

    const GetCustomerRequestData = async () => {
        await fetch('/get-customer-req-data', {
            method: 'GET'
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setCustomerReq_data(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })

        //Passing obj to dispatch to make selected cattle out of stock
        // Stock_Status_Dispatch({
        //     payload: 'out',
        // })
    }

    // console.log(CustomerReq_data);


    const OnConfirmOrder = async () => {

        //Maping values
        CustomerReq_data.map((value) => {
            Buy_now_cattle_id = value._id;
        })

        Promise.all([

            await fetch(`/remove-customer-request/${Buy_now_cattle_id}`, {
                method: 'POST',
            }),
            await fetch('/stock', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cattle_id, cattle_status
                })
            })

        ]).then((responses) => {
            return Promise.all(responses.map((res) => {
                return res.json();
            }))
        }).then((data) => {
            // console.log(data);
        }).catch((err) => {
            // console.log(err);
        })

        localStorage.removeItem('Stock_Status_State');

        return null;
    }

    useEffect(() => {

        GetCustomerRequestData();

    }, [])
    return (
        <>
            <Header />
            <Parallax
                bgImage={img1}
                bgImageStyle={{ height: '150%', maxWidth: '150%', opacity: '0.90' }}
                blur={{ min: -1, max: 1 }}
                strength={500}
            >
                <Container fluid>
                    <Row>
                        <Col className="pm-body">
                            <h1>Select Payment Method</h1>
                            <hr />
                            <Row>
                                <AnimationOnScroll animateIn="animate__fadeIn">
                                    <Col xs={12} sm={6} md={4} lg={4}>
                                        <Link to='/jazz-cash-payment' onClick={OnConfirmOrder}>
                                            <Cards
                                                Title='JazzCash'
                                                Des=''
                                                Image={imgjc}
                                                btntxt='Pay'
                                                goto='/jazz-cash-payment' />
                                        </Link>
                                    </Col>
                                </AnimationOnScroll>

                                <AnimationOnScroll animateIn="animate__fadeIn">
                                    <Col xs={12} sm={6} md={4} lg={4}>
                                        <Cards
                                            Title=''
                                            Des=''
                                            Image={imgep}
                                            btntxt='Pay'
                                            goto='/home' />
                                    </Col>
                                </AnimationOnScroll>

                                <AnimationOnScroll animateIn="animate__fadeIn">
                                    <Col xs={12} sm={6} md={4} lg={4}>
                                        <Link to='/stripe-payment' onClick={OnConfirmOrder}>
                                            <Cards
                                                Title='Stripe'
                                                Des=''
                                                Image={imgstripe}
                                                btntxt='Pay'
                                                goto='/stripe-payment' />
                                        </Link>
                                    </Col>
                                </AnimationOnScroll>

                                <AnimationOnScroll animateIn="animate__fadeIn">
                                    <Col xs={12} sm={6} md={4} lg={4}>
                                        <Link to='/order-placed' onClick={OnConfirmOrder}>
                                            <Cards
                                                Title='Cash on Delivery'
                                                Des=''
                                                Image={imgcod}
                                                btntxt='Pay'
                                                goto='/order-placed' />
                                        </Link>
                                    </Col>
                                </AnimationOnScroll>
                            </Row>
                            {/* <Button variant='primary' className="pm-btn" onClick={OnConfirmOrder} >Confirm Order</Button> */}
                        </Col>
                    </Row>
                </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default PaymentMethod;