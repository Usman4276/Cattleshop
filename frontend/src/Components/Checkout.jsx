import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/checkout.css';
import Header from './Header';
import Footer from './Footer';
import React, { useState, useEffect, useContext } from 'react';
import { ConsultantFeeContext, PickDropFeeContext, Total_Amount_Cart } from './App';
import { Link } from 'react-router-dom';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Checkout = () => {

    //Getting values using useContext
    const { ConsultantFeestate } = useContext(ConsultantFeeContext);
    const { PickDropFeestate } = useContext(PickDropFeeContext);
    const { Total_Amount_Cart_State } = useContext(Total_Amount_Cart);

    const [CartData, setCartData] = useState([]);
    const [Charges, setCharges] = useState(0);

    //Getting value from localstorage
    let CustomerEmail = localStorage.getItem('lstate');

    //Global variables
    const UploadPath = '/upload/';
    let myConsultantFeestate = 0, myPickDropFeeState = 0, cattlePrice = 0, id, cart_id = [];
    let data = [];

    //For loading previous states
    if (ConsultantFeestate === 0 && PickDropFeestate === 0) {

        const str1 = localStorage.getItem('ConsultantFeestate');
        const str2 = localStorage.getItem('PickDropFeestate');
        myConsultantFeestate = parseInt(str1);
        myPickDropFeeState = parseInt(str2);

    } else {

        localStorage.setItem('ConsultantFeestate', ConsultantFeestate);
        localStorage.setItem('PickDropFeestate', PickDropFeestate);
        myConsultantFeestate = ConsultantFeestate;
        myPickDropFeeState = PickDropFeestate;

    }


    const GetCartData = async () => {

        await fetch('/checkout', { method: 'GET' }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setCartData(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    // console.log(CartData);

    //Show Checkout Data
    const Show_Checkout_Data = () => {

        return (
            <>
                {
                    CartData.map((value, index) => {
                        id = value._id;
                        return (
                            <div key={index}>

                                {
                                    value.cart_data.map((value, index) => {
                                        if (index === 0) {
                                            return (
                                                <div key={index}>

                                                    <h4 className="checkout-text-h4">Package Details</h4>
                                                    <hr />
                                                    {

                                                        value.map((value, index) => {
                                                            cattlePrice = cattlePrice + value.cattle_price;
                                                            cart_id[index] = value._id;
                                                            return (
                                                                <div key={index}>
                                                                    <Row>
                                                                    {
                                                                        value.imgArray.map((value, index) => {
                                                                            return (
                                                                                <div key={index} className="checkout-pics">
                                                                                <Col sm={3}>
                                                                                    <img style={{ width: "13rem", height: "10rem" }} src={UploadPath + value} alt="img" />
                                                                                </Col>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    </Row>
                                                                    <div className="checkout-text-body">
                                                                    <Col className="checkout-text-h6">
                                                                    <h6>Cattle No# : {index + 1}</h6>
                                                                    <h6>Cattle name : {value.cattle_name}</h6>
                                                                    <h6>Cattle type : {value.cattle_type}</h6>
                                                                    <h6>Cattle age : {value.cattle_age}</h6>
                                                                    <h6>Cattle city : {value.cattle_city}</h6>
                                                                    <h6>Cattle price : {value.cattle_price}</h6>
                                                                    <h6>Supplier name : {value.supplier_name}</h6>
                                                                    
                                                                    </Col>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                        if (index === 1) {

                                            return (
                                                <div key={index}>
                                                    {
                                                        value.map((value, index) => {
                                                            return (
                                                                <div key={index}>
                                                                <br/>
                                                                    <h4 className="checkout-text-h4">Shipment Details</h4>
                                                                    <hr />
                                                                    <div className="checkout-text-body">
                                                                    <Col className="checkout-text-h6">
                                                                    <h6>Address : {value.address}</h6>
                                                                    <h6>Email : {value.email}</h6>
                                                                    <h6>Phone# : {value.phone}</h6>
                                                                    </Col>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                }

                            </div>
                        )
                    })
                }
            </>
        )
    }

    const Show_SubTotal = () => {

        const flag1 = isNaN(myConsultantFeestate);
        const flag2 = isNaN(myPickDropFeeState);

        if (flag1 === true && flag2 === true) {

            return (
                <>
                    <br/>
                    <h4 className="checkout-text-h4">Order Summary</h4>
                    <hr />
                    <div className="checkout-text-body">
                    <Col className="checkout-text-h6">
                    <h6>Subtotal : {cattlePrice}</h6>
                    <h6>Consultant fee : 0</h6>
                    <h6>Pick & Drop fee : 0</h6>
                    
                    <h6>Total : {Total_Amount_Cart_State}</h6>
                    
                    </Col>
                    </div>
                </>
            )

        } else {

            setCharges(myConsultantFeestate + myPickDropFeeState + Total_Amount_Cart_State);

            return (
                <>
                    <br/>
                    <h4 className="checkout-text-h4">Order Summary</h4>
                    <hr />
                    <div className="checkout-text-body">
                    <Col className="checkout-text-h6">
                    <h6>Subtotal : {cattlePrice}</h6>
                    <h6>Consultant fee : {myConsultantFeestate}</h6>
                    <h6>Pick & Drop fee : {myPickDropFeeState}</h6>
                    
                    <h6>Total : {Charges}</h6>
                    
                    </Col>
                    </div>
                </>
            )
        }
    }



    const RemoveCollection = async () => {

        Promise.all([
            await fetch(`/remove-checkout/${id}`, { method: 'POST' }),
            await fetch('/remove-cart', {
                method: 'POST',
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cart_id
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
    }

    useEffect(() => {
        GetCartData();
    }, [])

    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '150%', maxWidth: '150%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            <Container fluid>
                <Row>
                    <Col className="checkout-body">
                        
                        <h1>Checkout Page</h1>
                        <br />
                        <Show_Checkout_Data />
                        <Show_SubTotal />
                        <Link to='/payment-method' onClick={RemoveCollection}><Button variant='primary' className="checkout-buttton">Proceed to Pay</Button></Link>
                    </Col>
                </Row>
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default Checkout;