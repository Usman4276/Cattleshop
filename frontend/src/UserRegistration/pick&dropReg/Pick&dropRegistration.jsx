import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '../../css_files/pick&drop.css';
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

const PickanddropRegistration = () => {
    let name, value;

    const history = useHistory();
    const [state, setstate] = useState({
       fullname: '', email: '', password: '', address: '',cnic:'',vehicle_no:'',charges:'',phone:''
    })

    const getInput = (obj) => {

        name = obj.target.name;
        value = obj.target.value;


        setstate({ ...state, [name]: value })

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { fullname, email, password, address,cnic,vehicle_no,charges,phone } = state;
        //console.log(cnic);
        await fetch('/pick-and-drop-registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname:fullname, email: email, password: password, address: address,cnic:cnic,vehicle_no:vehicle_no, charges:charges, phone:phone
            })

        }).then((res) => {
            res.json().then((data)=>{
                //  console.log(data);
                if(data.empty==='true'){
                    window.alert('Empty input fields');
                }
                else if(data.three==='true'){
                    
                    // console.log(`all is ${data.all}`);
                    alert('Email,CNIC & Vehicle number is already registered');

                }else if(data.valid==='true'&&data.validCnic==='true'){

                    window.alert('Email & CNIC already registered');

                }else if(data.valid==='true'&&data.validVehicleNumber==='true'){

                    window.alert('Email & Vehicle number already registered');

                }else if(data.validVehicleNumber==='true'&&data.validCnic==='true'){

                    window.alert('CNIC & Vehicle number already registered');
                }
                else if(data.validCnic==='true'){

                    window.alert('CNIC already registered');
                }
                else if(data.validVehicleNumber==='true'){

                    window.alert('Vehicle number already registered');
                }
                else if(data.valid==='true'){

                    window.alert('Email already registered');
                }
                else{

                    window.alert('Pick & drop service Resgistered successfully');
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
            <div class="PADR-main-body">
            <Container fluid>
                <Row>
                    <Col>
                        <br/>
                        <h1 className="padr-h1">Pick & Drop Registration</h1>
                        <hr/>
                        <div className="padr-body">
                        <AnimationOnScroll delay={400} animateIn="animate__fadeIn">
                        <Form.Group>
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control type="text" placeholder="Enter Fullname" name="fullname" onChange={getInput} value={state.fullname} />
                        </Form.Group>
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
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" name="address" onChange={getInput} value={state.address} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CNIC</Form.Label>
                            <Form.Control type="number" placeholder="Enter CNIC e.g (xxxxx-xxxxxxx-x)" name="cnic" onChange={getInput} value={state.cnic} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Vehicle number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Vehicle No." name="vehicle_no" onChange={getInput} value={state.vehicle_no} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Charges per/km</Form.Label>
                            <Form.Control type="number" placeholder="Enter Charges" name="charges" onChange={getInput} value={state.charges} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone #</Form.Label>
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
export default PickanddropRegistration;