import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/proceedtopay.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { ConsultantFeeContext, PickDropFeeContext, CustomerIdTransfer, ConsultantIdTransfer, PickDropEmailTransfer, Total_Amount_Procced } from './App';


//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

const ProceedToPay = () => {

    //Getting values using useContext
    const { ConsultantFeestate } = useContext(ConsultantFeeContext);
    const { PickDropFeestate } = useContext(PickDropFeeContext);
    const { CustomerIDdispatch } = useContext(CustomerIdTransfer);
    const { ConsultantIdstate } = useContext(ConsultantIdTransfer);
    const { PickDropEmailstate } = useContext(PickDropEmailTransfer);
    const { Total_Amount_Procced_Dispatch } = useContext(Total_Amount_Procced);

    //Declaring useState hooks
    const [AllInfo, setAllInfo] = useState([]);
    const CattleId = localStorage.getItem('CattleId');
    const [TotalState, setTotal] = useState(0);
    const [MyId, setMyId] = useState([]);

    //Getting value from localstorage
    let CustomerEmail = localStorage.getItem('lstate');

    //Assigning customer email to dispatch
    CustomerIDdispatch({
        payload: CustomerEmail
    })

    //Global variables
    const UploadPath = '/upload/';
    let myConsultantFeestate = 0, myPickDropFeeState = 0, cattlePrice = 0, my_id;
    let selected_consultant_email = ConsultantIdstate;
    let selected_pickdrop_email = PickDropEmailstate;


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


    //Fetching data of selected Cattle & Customer from server
    const Get_Cattle_Customer_Details = async () => {

        Promise.all([
            await fetch(`/cattle-details/${CattleId}`, { method: 'POST' }),
            await fetch('/customer-detail', {
                method: 'POST',
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    CustomerEmail
                })
            })
        ]).then((responses) => {

            return Promise.all(responses.map((res) => {
                return res.json();
            }))
        }).then((data) => {
            // console.log(data);
            setAllInfo(data);

        }).catch((err) => {
            // console.log(err);
        })
    }



    //Showing Package and Shipment Details
    const Show_Package_And_Shipment_Details = () => {
        return (
            <>
                {
                    AllInfo.map((value, index) => {
                        if (index === 0) {
                            {/* console.log(value._id); */}
                            return (
                                <div key={index}>

                                    <h4 className="ptp-text-h4">Package Details</h4>
                                    <hr />

                                    <Row>
                                        {
                                            value.image.map((value, index) => {
                                                return (
                                                    <div key={index} className="ptp-pics">
                                                        <Col sm="3">
                                                            <img style={{ width: "13rem", height: "10rem" }} src={UploadPath + value} alt="img" />
                                                        </Col>
                                                    </div>
                                                )
                                            })

                                        }
                                    </Row>
                                    <div className="ptp-text-body">
                                        <Col className="ptp-text-h6">
                                            <h6>Cattle name : {value.cattle_name}</h6>
                                            <h6>Cattle type : {value.cattle_type}</h6>
                                            <h6>Cattle age : {value.cattle_age}</h6>
                                            <h6>Cattle city : {value.cattle_city}</h6>
                                            <h6>Sold by : {value.supplier_name}</h6>
                                        </Col>
                                    </div>
                                </div>
                            )
                        }
                    })
                }

                {
                    AllInfo.map((value, index) => {
                        if (index === 1) {
                            return (
                                <div key={index}>
                                    <br />
                                    <br />
                                    <h4 className="ptp-text-h4">Shipment Details</h4>
                                    <hr />

                                    {
                                        value.map((value, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="ptp-text-body">
                                                        <Col className="ptp-text-h6">
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
            </>
        )
    }


    // // console.log(AllInfo);
    //Showing Subtotal details
    const Show_SubTotal = () => {

        const flag1 = isNaN(myConsultantFeestate);
        const flag2 = isNaN(myPickDropFeeState);

        return (
            <>
                {
                    AllInfo.map((value, index) => {

                        if (flag1 === true && flag2 === true) {

                            if (index === 0) {

                                cattlePrice = value.cattle_price;
                                setTotal(cattlePrice);

                                return (
                                    <div key={index}>
                                        <div className="ptp-text-body">
                                            <Col className="ptp-text-h6">
                                                <h6>Subtotal : {value.cattle_price}</h6>
                                                <h6>Consultant fee : 0</h6>
                                                <h6>Pick & Drop fee : 0</h6>
                                                <br />
                                            </Col>
                                            <h5>Total : {TotalState} /-PKR</h5>
                                            <br />

                                        </div>
                                    </div>
                                )
                            }
                        } else {

                            if (index === 0) {

                                cattlePrice = value.cattle_price;
                                setTotal(myConsultantFeestate + myPickDropFeeState + cattlePrice);
                                return (
                                    <div key={index}>
                                        <div className="ptp-text-body">
                                            <Col className="ptp-text-h6">
                                                <h6>Subtotal : {value.cattle_price}</h6>
                                                <h6>Consultant fee : {myConsultantFeestate}</h6>
                                                <h6>Pick & Drop fee : {myPickDropFeeState}</h6>
                                                <br />
                                            </Col>
                                            <h5>Total : {TotalState} /-PKR</h5>
                                            <br />
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })
                }
            </>
        )
    }


    // console.log(AllInfo);
    //Code to execute one step before on leaving page
    const OnLeavingPage = async () => {

        let cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone;
        let imageArray = [];
        let selected_consultant_email = ConsultantIdstate;
        let selected_pickdrop_email = PickDropEmailstate;



        // Passing all fetched Data
        AllInfo.map((value, index) => {
            // console.log(value);

            if (index === 0) {

                value.image.map((value, index) => {

                    imageArray[index] = value;
                })

                cattle_name = value.cattle_name;
                cattle_type = value.cattle_type;
                cattle_age = value.cattle_age;
                cattle_city = value.cattle_city;
                _cattle_price = value.cattle_price;
                supplier_email = value.supplier_email;
                supplier_name = value.supplier_name;
                supplier_phone = value.supplier_phone;
            }

            if (index === 1) {
                value.map((value) => {
                    // console.log(value);
                    customer_fullname = value.fullname;
                    customer_email = value.email;
                    customer_phone = value.phone;
                })
            }
        })



        //Saving All Selected data to customer-request
        Promise.all([
            await fetch('/customer-request', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
                })
            }),
            await fetch('/consultant_notification-request', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
                })
            }),
            await fetch('/pick_drop_notification-request', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
                })
            }),
            await fetch('/second-order-history', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
                })
            }),
            await fetch('/my-orders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
                })
            })
        ]).then((responses) => {
            // console.log(responses);
            return Promise.all(responses.map((res) => {
                return res.json();
            }))
        }).then((data) => {
            // console.log(data);
        }).catch((err) => {
            // console.log(err);
        })


        //Saving the TotalState in dispatch
        Total_Amount_Procced_Dispatch({
            payload: TotalState
        })


        //Removing localstorage data
        localStorage.removeItem('ConsultantFeestate');
        localStorage.removeItem('PickDropFeestate');


    }


    useEffect(() => {
        Get_Cattle_Customer_Details();
        Show_SubTotal();
    }, []);


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
                        <Col className="ptp-body">

                            <Show_Package_And_Shipment_Details />

                            <h4 className="ptp-text-h4">Order Summary</h4>
                            <hr />

                            <Show_SubTotal />

                            <Link to='/payment-method' onClick={OnLeavingPage}><Button variant='primary' className="ptp-buttton">Proceed to Pay</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default ProceedToPay;