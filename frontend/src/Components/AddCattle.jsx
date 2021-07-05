import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '../css_files/addcattle.css';
import Header from './Header';
import React, { useState } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import Footer from './Footer';


//images imported here
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const AddProduct = () => {

    const [cattle_type, setCattle_type] = useState('')
    const [GetImgState, SetgetImgState] = useState([]);
    const [supplier_email, setSupplierEmailstate] = useState();
    const login_email = localStorage.getItem('lstate');
    const [imgState, setimgState] = useState('');
    const history = useHistory();

    //Global Variables
    let ImageFlag;
    let imgArray = [];
    const UploadPath = '/upload/';

    ImageFlag = localStorage.getItem('imgState');


    const select = [
        {
            label: 'Cow'
        },
        {
            label: 'Goat'
        },
        {
            label: 'Camel'
        },
        {
            label: 'Sheep'
        }
    ]

    const [state, setstate] = useState({
        cattle_name: '',
        cattle_age: '',
        cattle_des: '',
        cattle_city: '',
        cattle_price: '',
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setstate({ ...state, [name]: value });

        setimgState(e.target.files);

        setSupplierEmailstate(login_email);
    }


    const getOptionValue = (e) => {
        setCattle_type(e.label);
        // console.log(cattle_type);
    }

    const onSubmit = async (e) => {
        // e.preventDefault();
        // console.log(cattle_type);

        // console.log(state);

        const { cattle_name, cattle_age, cattle_des, cattle_city, cattle_price } = state;


        // console.log(supplier_email);

        if ((cattle_name === '' || cattle_type === '' || cattle_age === '' || cattle_des === '' || cattle_city === '' || cattle_city === '' || cattle_price === '')) {
            window.alert('Empty Input fields');

        } else if (ImageFlag === 'false' || ImageFlag === null) {
            window.alert('No Selected Image');
            // console.log(ImageFlag);
        } else {

            await fetch('/add-cattle', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_email
                })

            }).then((res) => {
                // console.log(res);
                res.json().then((data) => {
                    // console.log(data);
                    window.alert('Cattle added successfully');
                    localStorage.removeItem('imgState');
                    history.push('/account');
                }).catch((err) => {
                    // console.log(err);
                    window.alert('Cattle added failed');
                })
            }).catch((err) => {
                // console.log(`no saved data to db 😠 ${err}`);

            })

        }
    }

    // console.log(imgState);

    const onUploadHandler = async () => {

        // console.log(`In UploadHandler imgState=${imgState}`);

        if (imgState === null || imgState === '') {
            window.alert('No selected image');
        } else {

            localStorage.setItem('imgState', 'true');

            const formdata = new FormData();
            for (var x = 0; x < imgState.length; x++) {
                formdata.append('files', imgState[x]);
            }

            // console.log(imgState.length);
            // console.log(formdata.get('files'));
            if (imgState.length > 3) {
                window.alert('Image limit exceeded [Max-Limit = 3]');
            } else {

                await fetch('/upload', {
                    method: 'POST',
                    body: formdata


                }).then((res) => {
                    // console.log(res);

                    res.json().then((data) => {

                        SetgetImgState(data);
                        // console.log(data);


                        data.img.map((value, index) => {
                            // console.log(value.originalname);
                            imgArray = value.originalname;
                        })

                    }).catch((err) => {
                        // console.log(err);
                    })

                }).catch((err) => {
                    // console.log(`error of image ${err}`);

                })
            }

            // console.log(GetImgState);
        }

    }

    const PassingImgData = () => {

        // console.log(GetImgState);
        // console.log(imgArray);

        for (const x in GetImgState) {
            // console.log(x);
            if (x === 'img') {
                GetImgState[x].map((value, index) => {
                    // console.log(value.originalname);
                    imgArray[index] = value.originalname;
                })
            }
        }

        // console.log(imgArray);
    }

    const ShowImages = () => {

        PassingImgData();
        // console.log(imgArray);

        return (
            <>
                <Row>
                {
                    imgArray.map((value) => {
                        {/* console.log(value); */}
                        return (
                            <div key={value}>
                                <Col sm="3">
                                <img style={{width:"13rem", height:"10rem"}} src={UploadPath + value} alt="img"/>
                                </Col>
                            </div>
                        )
                    })
                }
                </Row>
            </>
        )


    }

    return (
        <>

            <Header />
            <Parallax
                bgImage={img1}
                bgImageStyle={{height: '210%', maxWidth: '100%', opacity: '0.90'}}
                blur={{ min: -1, max: 1 }}
                strength={600}>
            <Container fluid>
                <div className="addc-body">
                <Row>
                    <Col>

                        <h1>Add Cattle</h1>
                        <hr/>
                        <AnimationOnScroll delay={400} animateIn="animate__fadeIn">
                        <div className="addcf-body">
                        <br />
                        <br />
                        <br />
                        <ShowImages />
                        <br />
                        <Form.Group id="myForm" >
                            <Form.Label>Cattle image :</Form.Label>
                            <Form.Control type="file" multiple onChange={onChangeHandler} accept=".png,.jpg,.jpeg,.HEIF,.HEVC " />
                            <br />
                            <Button variant="success" onClick={onUploadHandler} >upload</Button>
                            <br />
                            <br />
                            <Form.Label>Cattle Name:</Form.Label>
                            <Form.Control type="text" name='cattle_name' onChange={onChangeHandler} value={state.cattle_name} />
                            <Form.Label>Cattle type:</Form.Label>
                            <Select options={select} onChange={getOptionValue} />
                            <Form.Label>Cattle age:</Form.Label>
                            <Form.Control type="number" name='cattle_age' onChange={onChangeHandler} value={state.cattle_age} />
                            <Form.Label>Cattle description:</Form.Label>
                            <Form.Control type="text" name='cattle_des' onChange={onChangeHandler} value={state.cattle_des} />
                            <Form.Label>Cattle city:</Form.Label>
                            <Form.Control type="text" name='cattle_city' onChange={onChangeHandler} value={state.cattle_city} />
                            <Form.Label>Cattle price:</Form.Label>
                            <Form.Control type="number" name='cattle_price' onChange={onChangeHandler} value={state.cattle_price} />
                            <br />
                            <Button variant="primary" type="submit" onClick={onSubmit} >Submit</Button>
                        </Form.Group>
                        <br /><br />
                        </div>
                        </AnimationOnScroll>
                    </Col>
                </Row>
                </div>
            </Container>
            </Parallax>
            <Footer/>
        </>
    )
}
export default AddProduct;