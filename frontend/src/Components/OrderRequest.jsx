import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/order-req.css';
import Header from './Header';
import Footer from './Footer';
import React, { useContext, useState, useEffect } from 'react';
import { CustomerIdTransfer, CattleIdContext, ConsultantIdTransfer, LoginContext, PickDropEmailTransfer } from './App';
import imgnoti from '../img/noti.png';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const OrderRequest = () => {

    //Getting values using useContext 
    const { CustomerIDstate } = useContext(CustomerIdTransfer);
    const { CattleIdstate } = useContext(CattleIdContext);
    const { ConsultantIdstate } = useContext(ConsultantIdTransfer);
    const { PickDropEmailstate } = useContext(PickDropEmailTransfer);
    const { lstate } = useContext(LoginContext);

    //Getting dispatch function of useReducer (using context API)
    const { CustomerIDdispatch } = useContext(CustomerIdTransfer);
    const { CattleIddispatch } = useContext(CattleIdContext);
    const { ConsultantIddispatch } = useContext(ConsultantIdTransfer);
    const { PickDropEmaildispatch } = useContext(PickDropEmailTransfer);

    //Declaring useStates
    const [state, setstate] = useState([]);
    const [Notifications, setNotifications] = useState([]);

    //Upload folder path
    const UploadPath = '/upload/';


    //Global variables
    let mylstate, mytstate;

    //Getting values from localstorage
    const tstate = localStorage.getItem('tstate');


    //For getting ongoing login state on page reload
    if (lstate === null) {
        mylstate = localStorage.getItem('lstate');
        mytstate = localStorage.getItem('tstate');
    } else {
        mylstate = lstate;
        mytstate = tstate;
    }


    const GetCustomerRequestData = async () => {

        Promise.all([
            await fetch('/notificaton-data', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mylstate, mytstate
                })
            }),
            await fetch('/consultant-pickdrp-checkout-notification', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mylstate, mytstate
                })
            })
        ]).then((responses) => {
            // console.log(responses);
            return Promise.all(responses.map((res) => {
                return res.json();
            }))
        }).then((data) => {
            // console.log(data);
            setNotifications(data);
        }).catch((err) => {
            // console.log(err);
        })
    }

    //Removing the completed order from order history
    // const onOrderDelievered = async (id) => {

    // }

    // console.log(Notifications);

    const NotificationsData = () => {


        const Acc_type = localStorage.getItem('tstate');

        if (Acc_type === 'consultant' || Acc_type === 'Consultant') {

            return (
                <>
                    {
                        Notifications.map((value, index) => {

                            if (index === 0) {

                                return (
                                    <div key={index}>
                                    
                                    <Row>
                                        
                                        {
                                            value.map((value, index) => {
                                                
                                                return (
                                                    <div key={index}>
                                                    <h2 style={{textAlign:'center'}}><span style={{ 'color': 'blue' }}>Customer Order#</span></h2>
                                                    <hr />
                                                        <Row className="or-data-row">
                                                        
                                                        <Col className="or-data-red-e">
                                                        <span><h6>Selected Consultant email : </h6><h6 style={{textAlign:'right'}}>{value.selected_consultant_email}</h6></span>
                                                        </Col>
                                                        <Col className="or-co-data1">
                                                        <Row>
                                                        {
                                                            value.imageArray.map((value, index) => {
                                                                return (
                                                                    <Col>
                                                                    <div key={index}>
                                                                        <img className="or-data-img" xs={12} sm={6} md={4} lg={4} src={UploadPath + value} alt="img" />
                                                                    </div>
                                                                    </Col>
                                                                )
                                                            })
                                                        }</Row>
                                                        </Col>
                                                        <Col className="or-co-data2">
                                                            <span><h6>Cattle name : </h6><h6 style={{textAlign:'right'}}>{value.cattle_name}</h6></span>
                                                            <span><h6>Cattle type : </h6><h6 style={{textAlign:'right'}}>{value.cattle_type}</h6></span>
                                                            <span><h6>Cattle age : </h6><h6 style={{textAlign:'right'}}>{value.cattle_age}</h6></span>
                                                            <span><h6>Cattle city : </h6><h6 style={{textAlign:'right'}}>{value.cattle_city}</h6></span>
                                                        </Col>
                                                        <Col className="or-co-data3">
                                                            <span><h6>Customer fullname : </h6><h6 style={{textAlign:'right'}}>{value.customer_fullname}</h6></span>
                                                            <span><h6>Customer email : </h6><h6 style={{textAlign:'right'}}>{value.customer_email}</h6></span>
                                                            <span><h6>Customer phone# : </h6><h6 style={{textAlign:'right'}}>{value.customer_phone}</h6></span>
                                                        </Col>
                                                        <Col className="or-co-data4">
                                                            <span><h6>Supplier name : </h6><h6 style={{textAlign:'right'}}>{value.supplier_name}</h6></span>
                                                            <span><h6>Supplier email : </h6><h6 style={{textAlign:'right'}}>{value.supplier_email}</h6></span>
                                                            <span><h6>Supplier phone# : </h6><h6 style={{textAlign:'right'}}>{value.supplier_phone}</h6></span>
                                                        </Col>
                                                        
                                                        
                                                        <Button variant="success">Order Delivered</Button>
                                                        </Row>
                                                        <hr/>
                                                    </div>
                                                )
                                            })
                                        }
                                        </Row>
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
                                                        <h1><span style={{ 'color': 'red' }}>Customer Order#</span></h1>
                                                        <hr />
                                                        <Row className="or-data-red-row">
                                                        <Col className="or-data-red-e">
                                                        <span><h6>Selected Consultant email : </h6><h6 style={{textAlign:'right'}}>{value.selected_consultant_email}</h6></span>
                                                        </Col>
                                                        {
                                                            value.cart_data.map((value, index) => {
                                                                if (index === 0) {

                                                                    return (
                                                                        <div key={index}>

                                                                            {
                                                                                value.map((value, index) => {
                                                                                    return (
                                                                                        <div key={index}>
                                                                                        <Row className="or-data-red-row">
                                                                                        <Col className="or-co-red-data1">
                                                                                            {
                                                                                                value.imgArray.map((value, index) => {
                                                                                                    return (
                                                                                                        <Col>
                                                                                                        <div key={index}>
                                                                                                        <img className="or-data-img" xs={12} sm={6} md={4} lg={4} src={UploadPath + value} alt="img" />
                                                                                                        </div>
                                                                                                        </Col>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                            
                                                                                            </Col>
                                                                                            <Col className="or-co-red-data2">
                                                                                                <span><h6>Cattle name : </h6><h6 style={{textAlign:'right'}}>{value.cattle_name}</h6></span>
                                                                                                <span><h6>Cattle type : </h6><h6 style={{textAlign:'right'}}>{value.cattle_type}</h6></span>
                                                                                                <span><h6>Cattle age : </h6><h6 style={{textAlign:'right'}}>{value.cattle_age}</h6></span>
                                                                                                <span><h6>Cattle city : </h6><h6 style={{textAlign:'right'}}>{value.cattle_city}</h6></span>
                                                                                            </Col>
                                                                                            <Col className="or-co-red-data3">
                                                                                                <span><h6>Supplier name : </h6><h6 style={{textAlign:'right'}}>{value.supplier_name}</h6></span>
                                                                                                <span><h6>Supplier email : </h6><h6 style={{textAlign:'right'}}>{value.supplier_email}</h6></span>
                                                                                                <span><h6>Supplier phone# : </h6><h6 style={{textAlign:'right'}}>{value.supplier_phone}</h6></span>
                                                                                            </Col>
                                                                                            </Row>
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
                                                                                        <Col className="or-co-red-data4">
                                                                                            <span><h6>Customer fullname : </h6><h6 style={{textAlign:'right'}}>{value.fullname}</h6></span>
                                                                                            <span><h6>Customer email : </h6><h6 style={{textAlign:'right'}}>{value.email}</h6></span>
                                                                                            <span><h6>Customer phone# : </h6><h6 style={{textAlign:'right'}}>{value.phone}</h6></span>
                                                                                        </Col>
                                                                                        <Col>
                                                                                            <Button variant="success" >Order Delivered</Button>
                                                                                        </Col>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }

                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        </Row>
                                                        <hr/>
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
        } else {
            return (
                <>
                    {
                        Notifications.map((value, index) => {

                            if (index === 0) {

                                return (
                                    <div key={index}>
                                    <Row>
                                        
                                        {
                                            value.map((value, index) => {
                                                return (
                                                    <div key={index}>
                                                    <h2 style={{textAlign:'center'}}><span style={{ 'color': 'blue' }}>Customer Order#</span></h2>
                                                    <hr />
                                                        <Row className="or-data-row">
                                                        
                                                        <Col className="or-data-pd-blue-e">
                                                        <span><h6>Selected Pick & Drop email : </h6><h6 style={{textAlign:'right'}}>{value.selected_pickdrop_email}</h6></span>
                                                        </Col>
                                                        <Col className="or-co-data1">
                                                        <Row>
                                                        {
                                                            value.imageArray.map((value, index) => {
                                                                return (
                                                                    <Col>
                                                                    <div key={index}>
                                                                        <img className="or-data-img" xs={12} sm={6} md={4} lg={4} src={UploadPath + value} alt="img" />
                                                                    </div>
                                                                    </Col>
                                                                )
                                                            })
                                                        }
                                                        </Row>
                                                        </Col>
                                                        <Col className="or-co-data2">
                                                            <span><h6>Cattle name : </h6><h6 style={{textAlign:'right'}}>{value.cattle_name}</h6></span>
                                                            <span><h6>Cattle type : </h6><h6 style={{textAlign:'right'}}>{value.cattle_type}</h6></span>
                                                            <span><h6>Cattle age : </h6><h6 style={{textAlign:'right'}}>{value.cattle_age}</h6></span>
                                                            <span><h6>Cattle city : </h6><h6 style={{textAlign:'right'}}>{value.cattle_city}</h6></span>
                                                        </Col>
                                                        <Col className="or-co-data3">
                                                            <span><h6>Customer fullname : </h6><h6 style={{textAlign:'right'}}>{value.customer_fullname}</h6></span>
                                                            <span><h6>Customer email : </h6><h6 style={{textAlign:'right'}}>{value.customer_email}</h6></span>
                                                            <span><h6>Customer phone# : </h6><h6 style={{textAlign:'right'}}>{value.customer_phone}</h6></span>
                                                        </Col>
                                                        <Col className="or-co-data4">
                                                            <span><h6>Supplier name : </h6><h6 style={{textAlign:'right'}}>{value.supplier_name}</h6></span>
                                                            <span><h6>Supplier email : </h6><h6 style={{textAlign:'right'}}>{value.supplier_email}</h6></span>
                                                            <span><h6>Supplier phone# : </h6><h6 style={{textAlign:'right'}}>{value.supplier_phone}</h6></span>
                                                        </Col>
                                                        
                                                        
                                                        <Button variant="success">Order Delivered</Button>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                        }
                                        </Row>
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
                                                    <h1><span style={{ 'color': 'red' }}>Customer Order#</span></h1>
                                                        <hr />
                                                        <Row className="or-data-red-row">
                                                        <Col className="or-data-pd-red-e">
                                                        <span><h6>Selected Pick & Drop email : </h6><h6 style={{textAlign:'right'}}>{value.selected_pickdrop_email}</h6></span>
                                                        </Col>
                                                        {
                                                            value.cart_data.map((value, index) => {
                                                                if (index === 0) {

                                                                    return (

                                                                        <div key={index}>

                                                                            {
                                                                                value.map((value, index) => {
                                                                                    return (
                                                                                        <div key={index}>
                                                                                        <Row className="or-data-red-row">
                                                                                        <Col className="or-co-red-data1">
                                                                                            {
                                                                                                value.imgArray.map((value, index) => {
                                                                                                    return (
                                                                                                        <Col>
                                                                                                        <div key={index}>
                                                                                                        <img className="or-data-img" xs={12} sm={6} md={4} lg={4} src={UploadPath + value} alt="img" />
                                                                                                        </div>
                                                                                                        </Col>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                            
                                                                                            </Col>
                                                                                            <Col className="or-co-red-data2">
                                                                                                <span><h6>Cattle name : </h6><h6 style={{textAlign:'right'}}>{value.cattle_name}</h6></span>
                                                                                                <span><h6>Cattle type : </h6><h6 style={{textAlign:'right'}}>{value.cattle_type}</h6></span>
                                                                                                <span><h6>Cattle age : </h6><h6 style={{textAlign:'right'}}>{value.cattle_age}</h6></span>
                                                                                                <span><h6>Cattle city : </h6><h6 style={{textAlign:'right'}}>{value.cattle_city}</h6></span>
                                                                                            </Col>
                                                                                            <Col className="or-co-red-data3">
                                                                                                <span><h6>Supplier name : </h6><h6 style={{textAlign:'right'}}>{value.supplier_name}</h6></span>
                                                                                                <span><h6>Supplier email : </h6><h6 style={{textAlign:'right'}}>{value.supplier_email}</h6></span>
                                                                                                <span><h6>Supplier phone# : </h6><h6 style={{textAlign:'right'}}>{value.supplier_phone}</h6></span>
                                                                                            </Col>
                                                                                            </Row>
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
                                                                                        <Col className="or-co-red-data4">
                                                                                            <span><h6>Customer fullname : </h6><h6 style={{textAlign:'right'}}>{value.fullname}</h6></span>
                                                                                            <span><h6>Customer email : </h6><h6 style={{textAlign:'right'}}>{value.email}</h6></span>
                                                                                            <span><h6>Customer phone# : </h6><h6 style={{textAlign:'right'}}>{value.phone}</h6></span>
                                                                                        </Col>
                                                                                        <Col>
                                                                                            <Button variant="success" >Order Delivered</Button>
                                                                                        </Col>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }

                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        </Row>
                                                        <hr/>
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
            bgImageStyle={{height: '150%', maxWidth: '150%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            <Container fluid>
                <Row>
                    <Col className="or-body">
                        <Button variant='info' onClick={GetCustomerRequestData}>Get Notifications <img src={imgnoti} style={{ width: "1.4rem" , height: "1.2rem", marginBottom:'0.2rem' }}/></Button>
                        <NotificationsData />
                    </Col>
                </Row>
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default OrderRequest;