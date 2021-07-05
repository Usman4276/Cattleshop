import { Container, Row, Col, Button, Form } from "react-bootstrap";
import '../css_files/addevent.css';
import Header from './Header';
import Footer from './Footer';
import React, { useContext, useState } from 'react'
import { useHistory } from "react-router";
import { AdminDashboardValidation } from './App';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cards from './Cards';
import imgregtick from '../img/reg-ticket.jpg';
import eventdetails from '../img/events.jpg';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const AddEvents = () => {

    //Getting values using context api
    const { AdminDashboardValidationState } = useContext(AdminDashboardValidation);

    //Declaring useState hooks
    const [imgState, setimgState] = useState('');
    const [Img_details, setImg_details] = useState([]);
    const [Input, setInput] = useState({
        title: '', venue: '', time: '', date: ''
    });

    //Global variables
    const history = useHistory();
    const UploadPath = '/events/';
    let img_name;

    const onChangeHandler = (obj) => {

        const name = obj.target.name;
        const value = obj.target.value;
        setInput({ ...Input, [name]: value });
        setimgState(obj.target.files);
    }

    // console.log(imgState);


    //On upload image handler
    const onUploadHandler = async () => {
        const formdata = new FormData();

        for (const key in imgState) {
            if (key === '0') {
                formdata.append('file', imgState[key]);
            }
        }

        //You cant do simple console on formdata to see its values below is the way to do that.
        // console.log(formdata.get('file'));

        if (imgState === '' || imgState === null) {
            window.alert('No image selected');
            return null;
        } else {

            await fetch('/upload-poster', {
                method: 'POST',
                body: formdata
            }).then((res) => {
                // console.log(res)
                res.json().then((data) => {
                    // console.log(data);
                    setImg_details([data]);
                }).catch((err) => {
                    // console.log(err);
                })
            }).catch((err) => {
                // console.log(err);
            })
        }

    }

    // console.log(Img_details);

    //Showing upload image
    const ShowUploadImage = () => {

        return (
            <>
                {
                    Img_details.map((value, index) => {
                        {/* console.log(value.filename); */ }
                        img_name = value.filename;
                        return (
                            <div key={index}>
                            <Col sm={2}>
                                <img style={{width:"13rem", height:"10rem", marginBottom:"2rem"}} src={UploadPath + value.filename} alt="img" />
                                </Col>
                            </div>
                        )
                    })
                }
            </>
        )
    }


    //Storing event form all values including image
    const onSubmit = async () => {

        await fetch('/event-detail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Input, img_name
            })
        }).then((res) => {
            // console.log(res)
            res.json().then((data) => {
                // console.log(data);
                window.alert('Event added successfully');
                history.push('/admin-dashboard');
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    //Making event form
    const EventForm = () => {

        if (AdminDashboardValidationState != 'true') {

            window.alert('Please login to continue...');
            history.push('/admin');
            return null;
        }
        else {

            return (
                <>
                    <Form.Group controlId="formBasicEmail">
                        <ShowUploadImage />
                        <Form.Control type="file" accept=".png,.jpg,.jpeg,.HEIF,.HEVC " onChange={onChangeHandler} />
                    </Form.Group>
                    <Button variant='success' onClick={onUploadHandler}>upload</Button>

                    <Form.Group>
                        <Form.Label>Event title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Event title" name="title" onChange={onChangeHandler} value={Input.title} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Event venue</Form.Label>
                        <Form.Control type="text" placeholder="Enter Event venue" name="venue" onChange={onChangeHandler} value={Input.venue} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Event time</Form.Label>
                        <Form.Control type="time" name="time" onChange={onChangeHandler} value={Input.time} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Event date</Form.Label>
                        <Form.Control type="date" name="date" onChange={onChangeHandler} value={Input.date} />
                    </Form.Group>
                    <Button variant='primary' onClick={onSubmit}>Submit</Button>

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


    // useEffect(() => {
    //     onUploadHandler();
    // }, [])

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
                <h1>Add Events</h1>
                    <hr/>
                </div>
                
                <AnimationOnScroll animateIn="animate__fadeIn">
                <Row>
                    
                <Dashboard/>
                    
                    
                <Col className="ade-body">
                        <div className="ade-form-body">
                            <EventForm />
                        </div>
                        
                    </Col>
                    <Col>
                    <AnimationOnScroll animateIn="animate__fadeIn">
                        <Col xs={12} sm={6} md={4} lg={4}><Cards 
                        Title='Registered Tickets'
                        Des=''
                        Image={imgregtick}
                        btntxt='Submit'
                        goto='/registered-tickets'/></Col>      
                        </AnimationOnScroll>  
                        <AnimationOnScroll animateIn="animate__fadeIn">

                        <Col xs={12} sm={6} md={4} lg={4}><Cards 
                        Title='Event Details'
                        Des=''
                        Image={eventdetails}
                        btntxt='Submit'
                        goto='/event-details-admin'/></Col>      
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


export default AddEvents;