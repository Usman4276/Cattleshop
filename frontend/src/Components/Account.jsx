import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/account.css';
import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import { LoginContext, TypeContext } from './App';
import { Link, useHistory } from 'react-router-dom';
import OrderRequest from './OrderRequest';

import Footer from './Footer';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Account = () => {

    const [state, setstate] = useState({});
    const { lstate } = useContext(LoginContext);
    const { tstate } = useContext(TypeContext);
    const history = useHistory();
    // console.log(`mylstate in out login function ${lstate}`);
    // console.log(`mytstate in out login function ${tstate}`);

    let mylstate, mytstate;


    if (lstate === null && tstate === null) {

        // console.log('i am in if condition');
        mylstate = localStorage.getItem('lstate');
        mytstate = localStorage.getItem('tstate');

    } else {

        // console.log('i am in else condition');
        //Clearing localStorage
        localStorage.removeItem('lstate', 'tstate');

        //Storing data to localstorage
        localStorage.setItem('lstate', lstate);
        localStorage.setItem('tstate', tstate);

        //Getting data from localStorage
        mylstate = localStorage.getItem('lstate');
        mytstate = localStorage.getItem('tstate');
    }

    const LoginData = async () => {

        // console.log(`mylstate in login function ${mylstate}`);
        // console.log(`mytstate in login function ${mytstate}`);

        await fetch('/account', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mylstate, mytstate
            })
        }).then((res) => {
            res.json().then((data) => {
                // console.log(`my data from db ${data}`);
                setstate(data);
            }).catch((e) => {
                // console.log(e);
            })
        }).catch((err) => {
            // console.log(err);
        })

    }

    useEffect(() => {
        LoginData();
    }, []);



    //Add product (by supplier)
    const AccountDashboard = () => {

        if (mytstate === 'supplier' || mytstate === 'Supplier') {
            return (
                <>
                    <Row>
                        <Col>
                        
                        <h3 style={{ color: 'blue' }} >User Name : {state.fullname}</h3>
                        <Container fluid className="account-data">
                            <h6>Account Type : {mytstate}</h6>
                            <h6>Email : {state.email}</h6>
                            <h6>Address : {state.address}</h6>
                            <h6>CNIC : {state.cnic}</h6>
                            <h6>Phone# : {state.phone}</h6>
                        </Container>
                        <Col>
                            <Link to='/add-cattle'><Button style={{marginRight: '2rem', marginTop: '2rem'}} variant='info'>Add Cattles</Button></Link>
                            <Link to='/show-cattles'><Button style={{ marginTop: '2rem'}} variant='info'>Show Cattles</Button></Link>
                        </Col>
                        </Col>
                    </Row>
                    
                </>
            )
        } else if (mytstate === 'consultant' || mytstate === 'Consultant') {
            return (
                <>

                    <Row>
                        <Col>
                        
                        <h3 style={{ color: 'blue' }} >User Name : {state.fullname}</h3>
                        <Container fluid className="account-data">
                            <h6>Account Type : {mytstate}</h6>
                            <h6>Email : {state.email}</h6>
                            <h6>Address : {state.address}</h6>
                            <h6>CNIC : {state.cnic}</h6>
                            <h6>Phone# : {state.phone}</h6>
                        </Container>
                        <Col>
                            <Link to='/customer-requests'><Button style={{marginRight: '2rem', marginTop: '2rem'}} variant='info'>My Customer Requests</Button></Link>
                        </Col>
                        </Col>
                    </Row>
                </>
            )
        }else if (mytstate === 'pick_&_drop_service' || mytstate === 'pick_&_drop_service') {
            return (
                <>

                    <Row>
                        <Col>
                        
                        <h3 style={{ color: 'blue' }} >User Name : {state.fullname}</h3>
                        <Container fluid className="account-data">
                            <h6>Account Type : {mytstate}</h6>
                            <h6>Email : {state.email}</h6>
                            <h6>Address : {state.address}</h6>
                            <h6>CNIC : {state.cnic}</h6>
                            <h6>Vehicle No# : {state.vehicle_no}</h6>
                            <h6>Phone# : {state.phone}</h6>
                        </Container>
                        <Col>
                            <Link to='/customer-requests'><Button style={{marginRight: '2rem', marginTop: '2rem'}} variant='info'>My Customer Requests</Button></Link>
                        </Col>
                        </Col>
                    </Row>
                </>
            )
        }else if (mytstate === 'customer' || mytstate === 'Customer'){
            return (
                <>
                    <Row>
                        <Col>
                        
                        <h3 style={{ color: 'blue' }} >User Name : {state.fullname}</h3>
                        <Container fluid className="account-data">
                            <h6>Account Type : {mytstate}</h6>
                            <h6>Email : {state.email}</h6>
                            <h6>Address : {state.address}</h6>
                            <h6>Phone# : {state.phone}</h6>
                        </Container>
                        <Col>
                            <Link to='/customer-orders'><Button style={{marginRight: '2rem', marginTop: '2rem'}} variant='info'>My Orders</Button></Link>
                        </Col>
                        </Col>
                    </Row>
                </>
            )
        }

        return null;
    }


    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '150%', maxWidth: '150%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={500}
            >
            
            <div className="acc-body">   
            <AnimationOnScroll animateOnce={true} delay={400} animateIn="animate__fadeIn">
                <AccountDashboard/>
            </AnimationOnScroll> 
            </div>
            </Parallax>
            <Footer/>

        </>
    )
}
export default Account;