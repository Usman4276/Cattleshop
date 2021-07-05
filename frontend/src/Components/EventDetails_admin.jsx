import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/event-detail.css';
import Header from './Header';
import Footer from './Footer';
import React, { useState, useEffect,useContext } from 'react';
import { AdminDashboardValidation } from './App';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";


//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const EventDetails_admin = () => {

    const [EventDetails, setEventDetails] = useState([]);
    const { AdminDashboardValidationState } = useContext(AdminDashboardValidation);
    const { AdminDashboardValidationDispatch } = useContext(AdminDashboardValidation);
    const history = useHistory();
    const UploadPath = '/events/';

    
    const GetEventDetails = async () => {
        await fetch('/show-event', {
            method: 'GET',
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setEventDetails(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }


    const onRemove = async (id) => {
        await fetch(`/remove-event/${id}`,{
            method:'POST',
        }).then((res) => {
            // console.log(res);
            window.alert('Event deleted successfully');
            history.push('/add-events')
        }).catch((err) => {
            // console.log(err);
        })
    }

    const ShowEventDetails = () => {

        return (
            <>
            <div className="ed-body">
            <Row>
                {
                    EventDetails.map((value, index) => {

                        return (
                            <div key={index}>
                            <Col xs={12} sm={8} md={10} lg={12} className="col-body-details">
                                <img style={{width:"13rem", height:"10rem", marginBottom:"2rem"}} src={UploadPath + value.img_name} alt="img" />

                                {
                                    value.event_detail.map((value, index) => {
                                        return (
                                            <div key={index}>
                                                <h6>Event title : {value.title}</h6>
                                                <h6>Event venue : {value.venue}</h6>
                                                <h6>Event date : {value.date}</h6>
                                                <h6>Event time : {value.time}</h6>
                                            </div>
                                        )
                                    })
                                }
                                <Button variant='danger' className="eventdetail-btn" onClick={() => { onRemove(value._id) }}>Remove</Button>
                                </Col>
                            </div>
                        )
                    })
                }
                </Row>
                </div>
            </>
        )
    }

    useEffect(() => {
        GetEventDetails();
    }, [])


    const Dashboard = () => {
        if (AdminDashboardValidationState === 'true') {

            return (
                <>
                    <Col sm={2} className="Admin-Dashboard">
                    <div className="col-md-12 text-center">
                    <h6 className="admindash-h6">Manage Events</h6><hr />
                    <Link to='/add-events'><Button variant='outline-info' block active className="Admin-Dashboard-buttons" >Events</Button></Link>
                    <h6 className="admindash-h6">Manage Suppliers</h6><hr />
                    <Link to='/manage-suppliers'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Suppliers</Button></Link>
                    <h6 className="admindash-h6">Manage Consultants</h6><hr />
                    <Link to='/manage-consultants'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Consultants</Button></Link>
                    <h6 className="admindash-h6">Manage Pick & Drop Services</h6><hr />
                    <Link to='/manage-pickdrops'><Button variant='outline-info' block className="Admin-Dashboard-buttons" >Pick & Drops</Button></Link>
                    <h6 className="admindash-h6">Manage Orders History</h6><hr />
                    <Link to='/orders-history'><Button variant='outline-info' block className="Admin-Dashboard-buttons"  >Orders History</Button></Link>
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
                <div className="admindash-body">
                <div className="admindash-heading">
                <h1>Upcoming Event Details</h1>
                    <hr/>
                </div>
                
                <AnimationOnScroll animateIn="animate__fadeIn">
                <Row>
                    
                <Dashboard/>
                    
                    
                    <Col>
                        <AnimationOnScroll animateOnce={true} animateIn="animate__fadeIn">
                            <ShowEventDetails />
                        </AnimationOnScroll>
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
export default EventDetails_admin;