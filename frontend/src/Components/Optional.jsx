import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import '../css_files/optional.css';
import Header from './Header';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { ConsultantFeeContext, PickDropFeeContext, CustomerIdTransfer, ConsultantIdTransfer, PickDropEmailTransfer, PreviousComponentStatus } from './App';


//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Optional = () => {

    const { ConsultantFeedispatch } = useContext(ConsultantFeeContext);
    const { PickDropFeedispatch } = useContext(PickDropFeeContext);
    const { ConsultantIddispatch } = useContext(ConsultantIdTransfer);
    const { PickDropEmaildispatch } = useContext(PickDropEmailTransfer);
    const { PreviousComponentStatusState } = useContext(PreviousComponentStatus);
    const { PreviousComponentStatusDispatch } = useContext(PreviousComponentStatus);
    const { ConsultantIdstate } = useContext(ConsultantIdTransfer);
    const { PickDropEmailstate } = useContext(PickDropEmailTransfer);

    const [ConsultantState, setConsultantState] = useState([]);
    const [PickDropState, setPickDrop] = useState([]);
    const [SelectedConsultantState, setSelectConsultantListState] = useState([]);
    const [SelectedPickDropState, setSelectPickDropListState] = useState([]);
    const [CartData, setCartData] = useState([]);

    const history = useHistory();

    //Global variables
    let myPrevState;

    localStorage.removeItem('ConsultantFeestate');
    localStorage.removeItem('PickDropFeestate');

    // console.log(PreviousComponentStatusState);



    //Loading previous state
    if (PreviousComponentStatusState === null) {
        myPrevState = localStorage.getItem('myPrevState');
    } else {
        myPrevState = PreviousComponentStatusState;
        localStorage.setItem('myPrevState', PreviousComponentStatusState);
    }

    const getConsultantData = async () => {

        ConsultantFeedispatch({
            payload: 0
        })

        PickDropFeedispatch({
            payload: 0
        })
        //Setting values null after first use
        ConsultantIddispatch({
            payload: ''
        })
        PickDropEmaildispatch({
            payload: ''
        })

        await fetch('/optional-consultant', {
            method: 'GET',
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setConsultantState(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    const getPickAndDropData = async () => {
        await fetch('/optional-pick-drop', {
            method: 'GET',
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setPickDrop(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    const onSelectConsultantList = (email, name, charges, phone) => {

        // console.log(email);
        setSelectConsultantListState([{ ['name']: name, charges, phone }]);

        ConsultantFeedispatch({
            payload: charges
        })

        ConsultantIddispatch({
            payload: email
        })


    }

    const onSelectPickDropList = (email, name, charges, phone) => {

        // console.log(charges)
        setSelectPickDropListState([{ ['name']: name, charges, phone }]);
        PickDropFeedispatch({
            payload: charges
        })
        PickDropEmaildispatch({
            payload: email
        })

    }

    // console.log(SelectedConsultantState);
    // console.log(SelectedPickDropState);

    const ShowConsultantList = () => {

        return (
            <>
                <div className="select-consultant-list" xs={12} sm={6} md={4} lg={4}>
                    {
                        ConsultantState.map((value, index) => {
                            {/* console.log(value); */}

                            return (
                                <div key={index}>

                                    <ListGroup>

                                        <ListGroup.Item action onClick={() => { onSelectConsultantList(value.email, value.fullname, value.charges, value.phone) }}>
                                            {value.fullname}<span> </span>{value.charges}<span> </span>{value.phone}
                                        </ListGroup.Item>

                                    </ListGroup>

                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    const ShowPickDropList = () => {

        return (
            <>
                <div className="select-pd-list" xs={12} sm={6} md={4} lg={4}>
                    {
                        PickDropState.map((value, index) => {
                            {/* console.log(value); */}

                            return (
                                <div key={index}>
                                    <ListGroup>

                                        <ListGroup.Item action onClick={() => { onSelectPickDropList(value.email, value.fullname, value.charges, value.phone) }}>
                                            {value.fullname}<span> </span>{value.charges}<span> </span>{value.phone}
                                        </ListGroup.Item>

                                    </ListGroup>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    const Get_Cart_Customer_data = async () => {

        //Getting value from localstorage
        let CustomerEmail = localStorage.getItem('lstate');

        //Fetching data from add-to-cart and customer-details
        Promise.all([
            await fetch('/add-to-cart', { method: 'GET' }),
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
            setCartData(data);
        }).catch((err) => {
            // console.log(err);
        })
    }

    // console.log(CartData);

    const onClickHandler = async () => {

        let selected_consultant_email = ConsultantIdstate;
        let selected_pickdrop_email = PickDropEmailstate;
        // // console.log(selected_consultant_email);

        if (myPrevState === 'cart') {

            if (CartData != '') {

                Promise.all([
                    await fetch('/checkout', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            CartData, selected_consultant_email, selected_pickdrop_email
                        })
                    }),
                    await fetch('/order-history', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            CartData, selected_consultant_email, selected_pickdrop_email
                        })
                    }),
                    await fetch('/pick-drop-checkout-notification', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            CartData, selected_consultant_email, selected_pickdrop_email
                        })
                    }),
                    await fetch('/consultant-checkout-notification', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            CartData, selected_consultant_email, selected_pickdrop_email
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
            }


            //Setting the Previous state cart i.e (data is going from cart)
            PreviousComponentStatusDispatch({
                payload: ''
            })

            // window.alert('Data added successfully');
            localStorage.removeItem('myPrevState');

            history.push('/checkout');

        } else {

            history.push('/proceed-to-pay');

        }
    }

    const ShowSelected = () => {
        // // console.log(state.name, state.charges, state.phone);

        return (

            <>
                <div className="selected-optional" xs={12} sm={6} md={4} lg={4}>
                    {
                        SelectedConsultantState.map((value, index) => {

                            {/* setShippingFee(ConsultantCharges+PickDropCharges); */ }
                            return (
                                <div key={index}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h4>Selected Consultant</h4>
                                            {value.name}<span> </span>{value.charges}<span> </span>{value.phone}
                                        </ListGroup.Item>
                                    </ListGroup>

                                </div>
                            )
                        })
                    }
                    {
                        SelectedPickDropState.map((value, index) => {

                            {/* setShippingFee(ConsultantCharges+PickDropCharges); */ }

                            return (
                                <div key={index}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h4>Selected Pick & Drop</h4>
                                            {value.name}<span> </span>{value.charges}<span> </span>{value.phone}
                                        </ListGroup.Item>
                                    </ListGroup>

                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }


    useEffect(() => {
        getConsultantData();
        getPickAndDropData();
        Get_Cart_Customer_data();
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
                    <div className="optional-body">

                        <Row>
                            <Col>
                                <h4 className="optional-h4">Select Consultant (optional)</h4>
                                <hr />
                                <br />
                                <ShowConsultantList />
                            </Col>

                            <Col>
                                <h4 className="optional-h4">Select Pick & Drop Service (optional)</h4>
                                <hr />
                                <br />
                                <ShowPickDropList />
                            </Col>

                            <Col>
                                <h4 className="optional-h4">Selected Service</h4>
                                <hr />
                                <br />
                                <ShowSelected />
                            </Col>


                        </Row>
                        <Row>
                            <Col className="opt-btn">
                                <Button variant='primary' onClick={onClickHandler}>Next</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default Optional;