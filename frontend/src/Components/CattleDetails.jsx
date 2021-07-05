import { Container, Row, Col, Button, Form } from "react-bootstrap";
import React, { useContext, useEffect, useState } from 'react'
import '../css_files/cattle_detail.css';
import Header from './Header';
import Footer from './Footer';
import { useHistory, Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CattleIdContext, AddToCartStatus, LoginContext } from './App';
import Sliderahs from './Slider';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const CattleDetails = () => {

    const { lstate } = useContext(LoginContext);
    const { CattleIdstate } = useContext(CattleIdContext);
    const { AddToCartStatusdispatch } = useContext(AddToCartStatus);
    const [state, setstate] = useState([]);
    const [RatingState, setRatingState] = useState();
    const [CommentState, setCommentState] = useState('');
    const [Allfeedback, setAllfeedback] = useState([]);

    let UploadPath = '/upload/';
    const history = useHistory();
    let myCattleId, no_comment_status = 'false', myRating, myCattleStockStatus;
    let imgArray = [], cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_name, supplier_email, supplier_phone, cattle_stock_status, customer_name;


    //Getting value from localstorage
    let CustomerEmail = localStorage.getItem('lstate');

    if (CattleIdstate === null || myCattleStockStatus === null) {
        myCattleId = localStorage.getItem('CattleId');
        myRating = localStorage.getItem('RatingState');
    } else {
        myCattleId = CattleIdstate;
        myRating = RatingState;
        localStorage.setItem('CattleId', myCattleId);
        localStorage.setItem('RatingState', myRating);
    }

    const getCattleDetails = async () => {

        Promise.all([
            await fetch(`/cattle-details/${myCattleId}`, { method: 'POST' }),
            await fetch('/feedback-data', { method: 'POST' }),
            await fetch('/stock', { method: 'GET' }),
            await fetch('/customer-detail', {
                method: 'POST',
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    CustomerEmail
                })
            })
        ]).then((responses) => {
            return Promise.all(responses.map((res) => {
                return res.json();
            }))
        }).then((data) => {
            // console.log(data);
            setstate(data);
        }).catch((err) => {
            // console.log(err);
            toast.error('Somthing wrong');
        })
    }

    // console.log(state);

    const onClickHandler = () => {

        const mytstate = localStorage.getItem('tstate');

        if (mytstate === 'customer' || mytstate === 'Customer') {
            history.push('/optional');
        } else {
            toast.error('Please Login as Customer to continue.');
        }
    }

    // console.log(state);


    //Maping cart status value
    state.map((value, index) => {
        if (index === 2) {
            value.map((value) => {
                if (value.cattle_id === myCattleId) {

                    cattle_stock_status = value.cattle_status;
                }
            })
        }
        if (index === 3) {
            value.map((value) => {
                customer_name = value.fullname;
            })
        }
    })

    // console.log(cattle_stock_status);

    const ShowData = () => {

        if (cattle_stock_status === 'out') {
            return (
                <>
                    {
                        state.map((value, index) => {

                            if (index === 0) {

                                cattle_name = value.cattle_name;
                                cattle_type = value.cattle_type;
                                cattle_age = value.cattle_age;
                                cattle_des = value.cattle_des;
                                cattle_city = value.cattle_city;
                                cattle_price = value.cattle_price;
                                supplier_name = value.supplier_name;
                                supplier_email = value.supplier_email;
                                supplier_phone = value.supplier_phone;

                                return (
                                    <div key={index}>

                                        {
                                            value.image.map((value, index) => {
                                                imgArray[index] = value;
                                            })
                                        }

                                        <Row className="data-body">
                                            <Col>
                                                <div className="cd-slider">
                                                    <Sliderahs image1={UploadPath + value.image[0]} image2={UploadPath + value.image[1]} image3={UploadPath + value.image[2]} />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="cd-details">
                                                    <h2 style={{ marginLeft: '2rem' }}>{value.cattle_name}</h2>
                                                    <Row className="ml-auto">
                                                        <Col sm={10}>
                                                        <h6 className="cad-text">Cattle Type :&nbsp;{value.cattle_type}</h6>
                                                        <h6 className="cad-text"><br />Age :&nbsp;{value.cattle_age}</h6>
                                                        <h6 className="cad-text"><br />Description :&nbsp;<br />{value.cattle_des}</h6></Col>
                                                        <Col sm={10} className="cad-loc-p"><h6 className="cad-text">Cattle City : {value.cattle_city}</h6></Col>
                                                        <Col sm={10} className="cad-p2"><h6 className="cad-text">Cattle Price : {value.cattle_price} /-PKR</h6></Col>
                                                        
                                                    </Row>
                                                    <Row className="cad-buttons" sm={8}>
                                                        <Row className="cad-oos">
                                                            <h6><span style={{ 'color': 'red' }}>Out of stock</span></h6>
                                                        </Row>
                                                        
                                                        <Row>
                                                            <Button variant='primary' onClick={onClickHandler} disabled>Buy Now</Button>
                                                            <Button variant='warning' style={{ marginLeft: '1rem' }} onClick={AddToCart} disabled>Add to cart</Button>
                                                        </Row>
                                                        
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                            if (index === 1) {
                                return (
                                    <div key={index}>

                                        <h1>Reviews</h1>
                                        <hr />
                                        {
                                            value.map((value, index) => {

                                                if (value.cattle_id === myCattleId) {
                                                    return (
                                                        <div key={index}>
                                                            <h6><span style={{ 'color': 'blue' }}>Comment by </span>: {value.customer_name}</h6>
                                                            <p>{value.comment}</p>
                                                        </div>
                                                    )
                                                } else {
                                                    no_comment_status = 'true';
                                                    return null;
                                                }
                                            })
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </>
            )
        } else {

            return (
                <>
                    {
                        state.map((value, index) => {

                            if (index === 0) {

                                cattle_name = value.cattle_name;
                                cattle_type = value.cattle_type;
                                cattle_age = value.cattle_age;
                                cattle_des = value.cattle_des;
                                cattle_city = value.cattle_city;
                                cattle_price = value.cattle_price;
                                supplier_name = value.supplier_name;
                                supplier_email = value.supplier_email;
                                supplier_phone = value.supplier_phone;

                                return (
                                    <div key={index}>

                                        {
                                            value.image.map((value, index) => {
                                                imgArray[index] = value;
                                            })
                                        }

                                        <Row className="data-body">
                                            <Col>
                                                <div className="cd-slider">
                                                    <Sliderahs image1={UploadPath + value.image[0]} image2={UploadPath + value.image[1]} image3={UploadPath + value.image[2]} />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="cd-details">
                                                    <h2 style={{ marginLeft: '2rem' }}>{value.cattle_name}</h2>
                                                    <Row className="ml-auto">
                                                        <Col sm={10}><h6 className="cad-text">Cattle Type :&nbsp;{value.cattle_type}</h6></Col>
                                                        <Col sm={10}><h6 className="cad-text"><br />Age :&nbsp;{value.cattle_age}</h6></Col>
                                                        <Col sm={10}><h6 className="cad-text"><br />Description :&nbsp;<br />{value.cattle_des}</h6></Col>
                                                        <Col sm={10} className="cad-loc-p"><h6 className="cad-text">Cattle City : {value.cattle_city}</h6></Col>
                                                        <Col sm={10} className="cad-p2"><h6 className="cad-text">Cattle Price : {value.cattle_price} /-PKR</h6></Col>

                                                    </Row>
                                                    <Row className="cad-buttons" sm={8}>
                                                        <Button variant='primary' onClick={onClickHandler}>Buy Now</Button>
                                                        <Button variant='warning' style={{ marginLeft: '1rem' }} onClick={AddToCart}>Add to cart</Button>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                            if (index === 1) {
                                return (
                                    <div key={index}>

                                        <h1 className="cad-h1">Reviews</h1>
                                        <hr />
                                        {
                                            value.map((value, index) => {

                                                if (value.cattle_id === myCattleId) {
                                                    return (
                                                        <div key={index}>
                                                            <div className="cad-comments">
                                                                <h6><span style={{ 'color': 'blue' }}>Comment by </span>: {value.customer_name}</h6>
                                                                <p>{value.comment}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    no_comment_status = 'true';
                                                    return null;
                                                }
                                            })
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </>
            )
        }
    }

    const AddToCart = async () => {

        const mytstate = localStorage.getItem('tstate');
        // console.log(mytstate);

        if (mytstate === 'customer' || mytstate === 'Customer') {

            const cart_status = 'true';

            await fetch('/add-to-cart', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imgArray, cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_name, supplier_email, supplier_phone
                })
            }).then((res) => {
                // console.log(res);
                res.json().then((data) => {
                    // console.log(data);
                    toast.success('Cattle added to cart successfully');
                }).catch((err) => {
                    // console.log(err);
                })
            }).catch((err) => {
                // console.log(err);
            })

            AddToCartStatusdispatch({
                payload: cart_status
            })
            // history.push('/cart');

        } else {
            toast.error('Please Login as Customer to continue.');
        }

    }

    const ratingChanged = (newRating) => {
        // console.log(newRating);
        setRatingState(newRating);
        toast.info('Thanks for your rating');
    }

    const getInput = (e) => {

        setCommentState(e.target.value);
    }

    const onPOST = async () => {

        const mytstate = localStorage.getItem('tstate');
        const cattle_id = localStorage.getItem('CattleId');

        if (mytstate === 'customer' || mytstate === 'Customer') {

            if (CommentState === '') {
                toast.error('Empty feedback');
            } else {

                await fetch('/feedback', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        CommentState, customer_name, cattle_id
                    })
                }).then((res) => {
                    res.json().then((data) => {
                        // console.log(data);
                        toast.success('Thanks for your feedback');
                    }).catch((err) => {
                        toast.error('Somthing wrong');
                    })

                }).catch((err) => {
                    toast.error('Somthing wrong');
                })

                setCommentState('');
            }
        } else {
            toast.error('Please Login as Customer to continue.');
        }
    }

    const NoComments = () => {
        if (no_comment_status === 'true') {
            return (
                <>
                    <h6>No Comments available!!</h6>
                </>
            )
        }
        else return null;
    }


    useEffect(() => {
        // console.log('useEffect');
        getCattleDetails();

    }, []);


    return (
        <>
            <Header />
            <Parallax
                bgImage={img1}
                bgImageStyle={{ height: '150%', maxWidth: '150%', opacity: '0.90' }}
                blur={{ min: -1, max: 1 }}
                strength={500}
            >
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="cad-body">

                                <h1 className="cad-h1">Cattle Details</h1>
                                <hr />

                                <div className="cad-content-body">

                                    <ShowData />

                                    <NoComments />
                                    <Row>
                                        <Col>
                                            <h1 className="cad-h1">Feedback</h1>

                                            <Form.Group>
                                                <Col>
                                                    <Form.Control type="text" placeholder="Type comment here" onChange={getInput} name="comment" value={CommentState} /></Col>
                                                <Col>
                                                    <Button variant='primary' onClick={onPOST}>Post</Button>
                                                </Col>
                                                <ToastContainer

                                                    position="top-center"
                                                    autoClose={3000}
                                                    hideProgressBar={true}
                                                    newestOnTop
                                                    closeOnClick
                                                    rtl={false}
                                                    pauseOnFocusLoss
                                                    draggable
                                                    pauseOnHover
                                                    transition={Bounce}
                                                />

                                            </Form.Group>
                                        </Col>
                                        <Col className="cad-rating">
                                            <h2 className="cad-h1">Rate Supplier:</h2>

                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={45}
                                                value={myRating}
                                                activeColor="#ffd700"
                                            />
                                        </Col>

                                    </Row>



                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default CattleDetails;

