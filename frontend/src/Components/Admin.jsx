import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '../css_files/admin.css';
import Header from './Header';
import Footer from './Footer';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminDashboardValidation } from './App';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Admin = () => {

    const { AdminDashboardValidationDispatch } = useContext(AdminDashboardValidation);
    const history = useHistory();
    const [state, setstate] = useState({
        email: '', password: ''
    })

    const onChangeHandler = (obj) => {

        const name = obj.target.name;
        const value = obj.target.value;

        setstate({ ...state, [name]: value })
    }

    const onSubmit = () => {
        // console.log(state);

        if ((state.email === null || state.password === null) || (state.email === '' || state.password === '')) {
            window.alert('Empty Input Fields');
        } else {

            if (state.email === 'admin' && state.password === 'admin') {

                AdminDashboardValidationDispatch({
                    payload: 'true'
                })

                history.push('/admin-dashboard');

            } else {
                window.alert('Invalid Credentials');
            }
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
            
            <Row>
                <Col className="admin-login-body">
                        <h1>Admin Login</h1>
                        <hr/>
                        <div className="admin-login-form">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChangeHandler} value={state.email} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange={onChangeHandler} value={state.password} />
                        </Form.Group>
                        <Button variant="primary" className="admin-login-btn" type="submit" onClick={onSubmit}>
                            Login
                        </Button>
                        </div>
                    </Col>
                </Row>
            
                
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default Admin;