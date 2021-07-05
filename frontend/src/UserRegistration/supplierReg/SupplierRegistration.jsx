import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '../../css_files/s_registration.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Parallax } from 'react-parallax';

//images imported here
import img1 from '../../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const SupplierRegistration = () => {
    let name, value;

    const history = useHistory();
    const [state, setstate] = useState({
       fullname: '', email: '', password: '', address: '',cnic:'',phone:''
    })

    const getInput = (obj) => {

        name = obj.target.name;
        value = obj.target.value;


        setstate({ ...state, [name]: value })

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { fullname, email, password, address,cnic,phone } = state;
        // console.log(cnic);
        await fetch('/supplier-registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname:fullname, email: email, password: password, address: address,cnic:cnic,phone:phone
            })

        }).then((res) => {
            res.json().then((data)=>{
                //  console.log(data);
                if(data.empty==='true'){
                    window.alert('Empty input fields');
                }
                else if(data.both==='true'){
                    
                    // console.log(`both is ${data.both}`);
                    window.alert('Email & CNIC is already registered');
                }else if(data.validCnic==='true'){
                    window.alert('This CNIC already registered');
                }else if(data.flag==='true'){
                    window.alert('Email already exist');
                }
                else{
                    window.alert('Supplier Resgistered successfully');
                    history.push('/home');
                }
            })
        }).catch((error) => {
            window.alert('Registration failed');
            // console.log(error);
        })
    }

    return (
        <>
            <Header />
            <Parallax
            bgImage={img1}
            bgImageStyle={{height: '210%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={600}>
            <div class="S-main-body">
            <Container fluid>
                <Row>
                    <Col>
                        <br/>
                        <h1 className="s-h1">Supplier Registration</h1>
                        <hr/>
                        <div className="s-body">
                        <AnimationOnScroll delay={400} animateIn="animate__fadeIn">
                        <Form.Group>
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control type="text" placeholder="Enter Fullname" name="fullname" onChange={getInput} value={state.fullname} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name="email" onChange={getInput} value={state.email} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={getInput} value={state.password} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" name="address" onChange={getInput} value={state.address} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CNIC</Form.Label>
                            <Form.Control type="number" placeholder="Enter CNIC e.g (xxxxx-xxxxxxx-x)" name="cnic" onChange={getInput} value={state.cnic} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone#</Form.Label>
                            <Form.Control type="number" placeholder="Enter Phone No." name="phone" onChange={getInput} value={state.phone} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={onSubmit}>
                            Submit
                        </Button>
                        </AnimationOnScroll>
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
export default SupplierRegistration;