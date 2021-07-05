import Header from './Header';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import '../css_files/event.css';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Events = () => {

    //Declaring useState hooks
    const [Inputs, setInputs] = useState({
        fullname: '', email: '', cnic: ''
    });

    const [EventDetails, setEventDetails] = useState([]);

    //Global variables
    const history = useHistory();
    const UploadPath = '/events/';

    const onChangeHandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setInputs({ ...Inputs, [name]: value })

    }


    const onSubmit = async () => {
        const { fullname, email, cnic } = Inputs;
        const today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();


        if (fullname === '' || email === '' || cnic === '') {
            window.alert('Empty input fields');
        } else {

            await fetch('/event-ticket', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname, email, cnic, date
                })
            }).then((res) => {

                res.json().then((data) => {
                    window.alert('Ticket created successfully');
                    history.push('/home');
                }).catch((err) => {
                    // console.log(err);
                })
            }).catch((err) => {
                // console.log(err);
            })
        }
    }

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


    // console.log(EventDetails)

    const ShowEventDetails = () => {

        return (
            <>
                {
                    EventDetails.map((value, index) => {

                        return (
                            <div key={index}>
                                <Col>
                                <img className="event-file" src={UploadPath + value.img_name} alt="img" />
                                </Col>
                                <Col>
                                    {
                                        value.event_detail.map((value, index) => {
                                            return (
                                                <div key={index} className="eventtiming">
                                                    <h4>Event title : {value.title}<span> </span>Event venue : {value.venue}<span> </span>Event date : {value.date}<span> </span> Event time : {value.time}</h4>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>

                                
                            </div>
                        )
                    })
                }
            </>
        )
    }

    const EventForm = () => {
        return (
            <>
                <Col className="event-form-ticket">
                <h4>Create Ticket to Attend Event</h4>
                <Form.Group id="myForm">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control type="text" placeholder="Enter fullname" name="fullname" value={Inputs.fullname} onChange={onChangeHandler} />
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name="email" value={Inputs.email} onChange={onChangeHandler} />
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control type="number" placeholder="Enter CNIC" name="cnic" value={Inputs.cnic} onChange={onChangeHandler} />
                    <Button variant='primary' style={{marginTop:'1rem'}} onClick={onSubmit}>Create Ticket</Button>
                </Form.Group>

                </Col>
                


            </>
        )
    }

    useEffect(() => {
        GetEventDetails();
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
                    <Col className="event-main-body">
                        <h1>Event Details</h1>
                        <hr />
                            <AnimationOnScroll animateIn="animate__fadeIn">
                            <Col className="Timing-of-event">
                                <ShowEventDetails />
                                <hr/>
                            </Col>
                            </AnimationOnScroll>
                            <AnimationOnScroll animateIn="animate__fadeIn">
                            <Col style={{marginLeft: '7rem'}}>
                                
                                <EventForm />
                            </Col>
                            </AnimationOnScroll>
                    </Col>
                </Row>
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default Events;