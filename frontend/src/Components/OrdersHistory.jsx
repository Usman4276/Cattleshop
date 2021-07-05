import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/order-history.css';
import Header from './Header';
import Footer from './Footer';
import { ConsultantFeeContext, PickDropFeeContext, Total_Amount_Cart } from './App';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { AdminDashboardValidation } from './App';
import { Link } from "react-router-dom";

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const OrdersHistory = () => {

    //Getting values using useContext
    const { ConsultantFeestate } = useContext(ConsultantFeeContext);
    const { PickDropFeestate } = useContext(PickDropFeeContext);
    const { Total_Amount_Cart_State } = useContext(Total_Amount_Cart);

    const { AdminDashboardValidationState } = useContext(AdminDashboardValidation);
    const { AdminDashboardValidationDispatch } = useContext(AdminDashboardValidation);
    const history = useHistory();
    const [Orders, setOrders] = useState([]);
    const [Charges, setCharges] = useState(0);
    const UploadPath = '/upload/';

    //Global variables
    let cattlePrice = 0, myConsultantFeestate = 0, myPickDropFeeState = 0;

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

    // console.log(ConsultantFeestate);

    const GetOrderHistory = async () => {

        Promise.all([
            await fetch('/order-history', { method: 'GET' }),
            await fetch('/order-history-two', { method: 'GET' })
        ]).then((responses) => {

            return Promise.all(responses.map((res) => {
                return res.json();
            }))
        }).then((data) => {
            // console.log(data);
            setOrders(data);

        }).catch((err) => {
            // console.log(err);
        })
    }

    // console.log(Orders);
    const Show_Orders_History = () => {
        let count = 0;
        

        return (
            <>
                {

                    Orders.map((value, index) => {
                        if (value.length != 0) {

                            if (index === 0) {
                                return (
                                    <div key={index}>

                                        {
                                            value.map((value, index) => {
                                                count = index;
                                                return (
                                                    <div key={index}>
                                                        <h2><span style={{ 'color': 'blue' }}>Customer Order #</span></h2>

                                                        <h6>Selected Consultant email : {value.selected_consultant_email}</h6>
                                                        <h6>Selected Pick & Drop email : {value.selected_pickdrop_email}</h6>

                                                        {
                                                            value.cart_data.map((value, index) => {
                                                                if (index === 0) {
                                                                    return (
                                                                        <div key={index}>

                                                                            <h4>Package Details</h4>
                                                                            <hr />
                                                                            {

                                                                                value.map((value, index) => {

                                                                                    cattlePrice = cattlePrice + value.cattle_price;

                                                                                    return (
                                                                                        <div key={index}>

                                                                                            {
                                                                                                value.imgArray.map((value, index) => {
                                                                                                    return (
                                                                                                        <div key={index}>
                                                                                                            <img src={UploadPath + value} alt="img" />
                                                                                                        </div>
                                                                                                    )
                                                                                                })
                                                                                            }

                                                                                            <br />
                                                                                            <h6>Cattle No# : {index + 1}</h6>
                                                                                            <h6>Cattle name : {value.cattle_name}</h6>
                                                                                            <h6>Cattle type : {value.cattle_type}</h6>
                                                                                            <h6>Cattle age : {value.cattle_age}</h6>
                                                                                            <h6>Cattle city : {value.cattle_city}</h6>
                                                                                            <h6>Cattle price : {value.cattle_price}</h6>
                                                                                            <h6>Supplier name : {value.supplier_name}</h6>
                                                                                            <hr />
                                                                                            <br />
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
                                                                                            <br />
                                                                                            <br />
                                                                                            <h4>Shipment Details</h4>
                                                                                            <hr />
                                                                                            <h6>Customer Address : {value.address}</h6>
                                                                                            <h6>Customer Email : {value.email}</h6>
                                                                                            <h6>Customer Phone# : {value.phone}</h6>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }

                                                        <Show_SubTotal />

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
                                        <h2><span style={{ 'color': 'blue' }}>Customer Order #</span></h2>
                                        <br />
                                        <h4>Package Details</h4>
                                        <hr />
                                        {
                                            value.map((value, index) => {
                                                count++;
                                                return (

                                                    <div key={index}>
                                                        {
                                                            value.imageArray.map((value, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <img src={UploadPath + value} alt="img" />
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                        <br />
                                                        <h6>Cattle No# : {index + 1}</h6>
                                                        <h6>Cattle name : {value.cattle_name}</h6>
                                                        <h6>Cattle type : {value.cattle_type}</h6>
                                                        <h6>Cattle age : {value.cattle_age}</h6>
                                                        <h6>Cattle city : {value.cattle_city}</h6>
                                                        <h6>Cattle price : {value.cattle_price}</h6>
                                                        <h6>Supplier name : {value.supplier_name}</h6>
                                                        <hr />
                                                        <br />
                                                        <br />
                                                        <br />
                                                        <h4>Shipment Details</h4>
                                                        <hr />
                                                        <h6>Customer fullname : {value.customer_fullname}</h6>
                                                        <h6>Customer Email : {value.customer_email}</h6>
                                                        <h6>Customer Phone# : {value.customer_phone}</h6>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        } else {
                            return null;
                        }
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
                    <br /><br />
                    <h4>Order Summary</h4>
                    <hr />
                    <h6>Subtotal : {cattlePrice}</h6>
                    <h6>Consultant fee : 0</h6>
                    <h6>Pick & Drop fee : 0</h6>
                    <br />
                    <h6>Total : {Total_Amount_Cart_State}</h6>
                    <hr /><br />
                </>
            )

        } else {

            setCharges(myConsultantFeestate + myPickDropFeeState + Total_Amount_Cart_State);

            return (
                <>
                    <br /><br />
                    <h4>Order Summary</h4>
                    <hr />
                    <h6>Subtotal : {cattlePrice}</h6>
                    <h6>Consultant fee : {myConsultantFeestate}</h6>
                    <h6>Pick & Drop fee : {myPickDropFeeState}</h6>
                    <br /><hr />
                    <h6>Total : {Charges}</h6>
                    <hr /><br />
                </>
            )
        }
    }
    const Dashboard = () => {
        if (AdminDashboardValidationState === 'true') {

            return (
                <>
                    <Col sm={2} className="Admin-Dashboard">
                        <div className="col-md-12 text-center">
                            <h6 className="admindash-h6">Manage Events</h6><hr />
                            <Link to='/add-events'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Events</Button></Link>
                            <h6 className="admindash-h6">Manage Suppliers</h6><hr />
                            <Link to='/manage-suppliers'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Suppliers</Button></Link>
                            <h6 className="admindash-h6">Manage Consultants</h6><hr />
                            <Link to='/manage-consultants'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Consultants</Button></Link>
                            <h6 className="admindash-h6">Manage Pick & Drop Services</h6><hr />
                            <Link to='/manage-pickdrops'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Pick & Drops</Button></Link>
                            <h6 className="admindash-h6">Manage Orders History</h6><hr />
                            <Link to='/orders-history'><Button variant='outline-info' block active className="Admin-Dashboard-buttons"  >Orders History</Button></Link>
                            <h6 className="admindash-h6">Manage Transactions & Payments</h6><hr />
                            <a href="https://sandbox.jazzcash.com.pk/Sandbox/Home/callLogPageRedirection2" target='_blank'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Transactions</Button></a>
                        </div>
                    </Col>
                </>
            )

        } else {

            window.alert('Please login to continue...');
            history.push('/admin');
            return null;
        }


    }

    useEffect(() => {
        GetOrderHistory();
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
                    <div className="admindash-body">
                        <div className="admindash-heading">
                            <h1>Orders History</h1>
                            <hr />
                        </div>

                        <AnimationOnScroll animateIn="animate__fadeIn">
                            <Row>

                                <Dashboard />

                                <Col className="order-history">

                                    <Show_Orders_History />

                                </Col>
                            </Row>
                        </AnimationOnScroll>
                    </div>
                </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default OrdersHistory;