import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/mycart.css';
import Header from './Header';
import Footer from './Footer';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import {  PreviousComponentStatus, Total_Amount_Cart } from './App';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';


const MyCart = () => {

    const { PreviousComponentStatusDispatch } = useContext(PreviousComponentStatus);
    const { Total_Amount_Cart_Dispatch } = useContext(Total_Amount_Cart);

    const [CattleDetails, setCattleDetails] = useState([]);
    const [Total, setTotal] = useState(0);
    const UploadPath = '/upload/';
    const history = useHistory();
    let cattlePrice = 0;;

    //Setting the Previous state cart i.e (data is going from cart)
    PreviousComponentStatusDispatch({
        payload:'cart'
    })


    const GetCattleDetails = async () => {

        await fetch('/add-to-cart', {
            method: 'GET',
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setCattleDetails(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    // console.log(CattleDetails);

    //Maping cattle data
    const CattleData = () => {


        // console.log(CattleDetails);

        return (
            <>
                {
                    CattleDetails.map((value, index) => {

                        cattlePrice = cattlePrice + value.cattle_price;
                        setTotal(cattlePrice);

                        return (
                            <div key={index}>
                                <Row>
                                {
                                    value.imgArray.map((value, index) => {
                                        
                                        return (
                                            
                                            <div key={index}  className="cart-pics">
                                            <Col sm={3}>
                                                <img style={{ width: "13rem", height: "10rem" }} src={UploadPath + value} alt="img" />
                                            </Col>
                                            </div>
                                        )
            
                                    })
                                }
                                </Row>
                                <div className="cart-text-body">
                                <Col className="cart-text-h6">
                                <h6>Cattle name : {value.cattle_name}</h6>
                                <h6>Cattle type : {value.cattle_type}</h6>
                                <h6>Cattle age : {value.cattle_age}</h6>
                                <h6>Cattle city : {value.cattle_city}</h6>
                                <h6>Cattle description : {value.cattle_des}</h6>
                                <h6>Cattle price : {value.cattle_price}</h6>
                                <Button variant='danger' onClick={() => { onRemove(value._id) }}>Remove</Button>
                                </Col>
                                
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )

    }

    const TotalAmount = () => {

        if (Total > 0) {

            //Transfering total amount to checkout page
            Total_Amount_Cart_Dispatch({
                payload:Total
            })

            return (
                <>
                <Col  className="cart-text-h6">
                    <h6>Total : <span style={{ color: 'blue' }}>{Total}</span></h6>
                    <Link to='/optional'><Button variant='primary'>Checkout</Button></Link>
                </Col>
                </>
            )
        }
        return null;
    }

    // console.log(cattlePrice);
    const onRemove = async (id) => {

        // // console.log(id);
        // localStorage.removeItem('CattleId');
        await fetch(`/cart/${id}`, {
            method: 'POST',
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                window.alert('Cattle removed successfully');
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })

        history.push('/home');
    }

    useEffect(() => {
        GetCattleDetails();
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
                    <Col className="cart-body">
                        <h1>My Cart</h1>
                        <hr/>
                        <AnimationOnScroll animateIn="animate__fadeIn">
                        <CattleData />
                        <TotalAmount />
                        </AnimationOnScroll>
                    </Col>
                </Row>
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default MyCart;