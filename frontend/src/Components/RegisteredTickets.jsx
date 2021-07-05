import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/registered-ticket.css';
import Header from './Header';
import Footer from './Footer';
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AdminDashboardValidation } from './App';
import { Link } from "react-router-dom";

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const RegisteredTickets = () => {

    const [Tickets, setTickets] = useState([]);
    const { AdminDashboardValidationState } = useContext(AdminDashboardValidation);
    const { AdminDashboardValidationDispatch } = useContext(AdminDashboardValidation);
    const history = useHistory();
    
    const GetTickets = async () => {
        await fetch('/event-ticket', { method: 'GET' }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setTickets(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    const onDelete = async (id) => {
        await fetch(`/event-ticket/${id}`, {
            method: 'POST',
        }).then((res) => {
            res.json().then((data) => {
                // console.log(data);
                window.alert('Ticket removed successfully');
                history.push('/add-events');

            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    const ShowTickets = () => {
        // console.log(Tickets);
        return (
            <>
                {
                    Tickets.map((value, index) => {
                        return (
                            <div key={index}>
                                <br />
                                <h4><span style={{ 'color': 'blue' }}>Created at</span> : {value.date}</h4>
                                <h6>Fullname : {value.fullname}</h6>
                                <h6>Email : {value.email}</h6>
                                <h6>CNIC# : {value.cnic}</h6>
                                <br /><Button variant="danger" onClick={() => { onDelete(value._id) }}>Delete</Button>
                                <hr />
                            </div>
                        )
                    })
                }
            </>
        )
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

    useEffect(() => {
        GetTickets();
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
                <div className="admindash-body">
                <div className="admindash-heading">
                    <h1>Registered Tickets</h1>
                    <hr/>
                </div>
                
                <AnimationOnScroll animateIn="animate__fadeIn">
                <Row>
                    
                    <Dashboard />
                    
                    <Col className="events-registered-ticket-body-inner">
                    
                    <ShowTickets />
                        
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
export default RegisteredTickets;