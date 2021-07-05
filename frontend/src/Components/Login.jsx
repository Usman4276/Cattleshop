import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '../css_files/login.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { UserContext, LoginContext, TypeContext} from './App';


import { Parallax } from 'react-parallax';

//images imported here
import img1 from '../img/1111.jpg';


const Login = () => {

    const { dispatch } = useContext(UserContext);

    const { ldispatch } = useContext(LoginContext);

    const { tdispatch } = useContext(TypeContext);

    

    const select = [
        {
            label: 'Customer'
        },
        {
            label: 'Consultant'
        },
        {
            label: 'Supplier'
        },
        {
            label: 'Pick & Drop Service'
        }
    ]


    let name, value, loginAs;

    const history = useHistory();

    const [state, setstate] = useState({
        email: '', password: ''
    })

    const getInput = (obj) => {

        name = obj.target.name;
        value = obj.target.value;
        setstate({ ...state, [name]: value })
    }

    const getOptionValue = (e) => {
        loginAs = e.label;
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state;

        if (loginAs == null) {
            window.alert('Empty input fields');
        } else {

            if (loginAs === 'Customer') {
                // console.log('i am in customer');
                await fetch('/customer-login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email, password: password
                    })

                }).then((res) => {
                    res.json().then((data) => {
                        // console.log(data);
                        if (data.empty === 'true') {
                            window.alert('Empty input fields');
                        }
                        else if (data.login === 'false') {
                            window.alert('Invalid credentials');
                        } else if (data.login === 'fail') {

                            window.alert('Login failed');

                        } else {
                            localStorage.setItem('lstate',email);
                            localStorage.setItem('tstate',loginAs);
                            window.alert('Login successfull');
                            //dispatching the data to useReducer()
                            dispatch({
                                type: 'customer',
                                payload: 'true'
                            });

                            ldispatch({
                                type: 'customer',
                                data: email
                            });

                            tdispatch({
                                type:'customer',
                                payload: 'customer'
                            });

                            history.push('/home');
                        }
                    }).catch((error) => {
                        // console.log(`my error 1 ${error}`);
                    })
                }).catch((error) => {
                    // console.log(`my error ${error}`);
                    window.alert('Login failed');
                })

            }
            else if (loginAs === 'Supplier') {
                await fetch('/supplier-login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email, password: password
                    })

                }).then((res) => {
                    res.json().then((data) => {
                        // console.log(data);
                        if (data.empty === 'true') {
                            window.alert('Empty input fields');
                        }
                        else if (data.login === 'false') {
                            window.alert('Invalid credentials');
                        } else if (data.login === 'fail') {

                            window.alert('Login failed');

                        } else {
                            localStorage.setItem('lstate',email);
                            localStorage.setItem('tstate',loginAs);
                            window.alert('Login successfull');
                            dispatch({
                                type: 'supplier',
                                payload: 'true',
                            });

                            ldispatch({
                                type: 'supplier',
                                data: email
                            });

                            tdispatch({
                                type:'supplier',
                                payload: 'supplier'
                            });

                            history.push('/home');
                        }
                    }).catch((error) => {
                        // console.log(`my error 1 ${error}`);
                    })
                }).catch((error) => {
                    window.alert('Login failed');
                    // console.log(error);
                })
            } else if (loginAs === 'Consultant') {
                await fetch('/consultant-login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email, password: password
                    })

                }).then((res) => {
                    res.json().then((data) => {
                        // console.log(data);
                        if (data.empty === 'true') {
                            window.alert('Empty input fields');
                        }
                        else if (data.login === 'false') {
                            window.alert('Invalid credentials');
                        } else if (data.login === 'fail') {

                            window.alert('Login failed');

                        } else {
                            localStorage.setItem('lstate',email);
                            localStorage.setItem('tstate',loginAs);
                            window.alert('Login successfull');
                            dispatch({
                                type: 'consultant',
                                payload: 'true',
                            });

                            ldispatch({
                                type: 'consultant',
                                data: email
                            });

                            tdispatch({
                                type:'consultant',
                                payload: 'consultant'
                            });

                            history.push('/home');
                        }
                    }).catch((error) => {
                        // console.log(`my error 1 ${error}`);
                    })
                }).catch((error) => {
                    window.alert('Login failed');
                    // console.log(error);
                })
            } else {
                await fetch('/pick-&-drop-service-login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email, password: password
                    })

                }).then((res) => {
                    res.json().then((data) => {
                        // console.log(data);
                        if (data.empty === 'true') {
                            window.alert('Empty input fields');
                        }
                        else if (data.login === 'false') {
                            window.alert('Invalid credentials');
                        } else if (data.login === 'fail') {

                            window.alert('Login failed');

                        } else {
                            localStorage.setItem('lstate',email);
                            localStorage.setItem('tstate',loginAs);
                            window.alert('Login successfull');
                            dispatch({
                                type: 'p&dservice',
                                payload: 'true',
                            });

                            ldispatch({
                                type: 'p&dservice',
                                data: email
                            });

                            tdispatch({
                                type:'pick_&_drop_service',
                                payload: 'pick_&_drop_service'
                            });

                            history.push('/home');
                        }
                    }).catch((error) => {
                        // console.log(`my error 1 ${error}`);
                    })
                }).catch((error) => {
                    window.alert('Login failed');
                    // console.log(error);
                })
            }
        }
    }

    return (
        <>
            <Header />
            <Parallax
                bgImage={img1}
                bgImageStyle={{height: '210%', maxWidth: '100%', opacity: '0.90'}}
                blur={{ min: -1, max: 1 }}
                strength={600}>
            <div className="Login-main-body">
            <Container fluid>
                <Row>
                    <Col>
                        <br/>
                        <h1 className="L-headings-h1">Login</h1>
                        <hr/>
                        <div className="Login-body">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={getInput} value={state.email} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={getInput} value={state.password} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Login as</Form.Label>
                            <Select options={select} onChange={getOptionValue} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={onSubmit} >
                            Submit
                        </Button>
                        <Link to='/register' style={{ color: 'blue' ,marginLeft:'2%'}} > Don't have an account</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
            </Parallax>
            <Footer />
        </>
    )
}
export default Login;
