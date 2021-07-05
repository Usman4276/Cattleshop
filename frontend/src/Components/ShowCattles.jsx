import React from 'react';
import { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/showcattle.css';
import Header from './Header';
import Footer from './Footer';
import { LoginContext, Edit_CattleID } from './App';
import { useHistory } from 'react-router-dom';



//For parallax
import img1 from '../img/1112.png';
import { Parallax } from 'react-parallax';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const ShowCattle = () => {

    const { lstate } = useContext(LoginContext);
    const { Edit_CattleID_Dispatch } = useContext(Edit_CattleID);
    const [state, setstate] = useState([]);
    const [ImagePath, setImagePath] = useState({});
    const history = useHistory();


    let mylstate;

    if (lstate === null) {
        mylstate = localStorage.getItem('lstate');
    } else {
        mylstate = lstate;
    }

    const ShowData = async () => {

        await fetch('/show-cattles', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mylstate
            })
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setstate(data);
            }).catch((e) => {
                // console.log(e);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    const ShowList = () => {

        setImagePath('/upload/');
        // console.log(state);


        return (
            <>
                {
                    state.map((value, index) => {
                        {/* console.log(value); */}
                        return (
                            <div className="sc-data" key={index}>
                            
                            <AnimationOnScroll animateIn="animate__fadeIn">
                                <Row>
                                {
                                    value.image.map((value, index) => {
                                        return (
                                            <div key={index}>
                                                <Col sm="3">
                                                    <img style={{width:"13rem", height:"10rem"}} src={ImagePath + value} alt="img" />
                                                </Col>    
                                            </div>
                                        )
                                    })
                                    
                                }
                                </Row>
                                <Row>
                                    
                                    <Col className="data-bc">
                                        <h6>Cattle _id : {value._id}</h6>
                                        <h6>Cattle Name : {value.cattle_name}</h6>
                                        <h6>Cattle Type : {value.cattle_type}</h6>
                                        <h6>Cattle Age : {value.cattle_age}</h6>
                                        <h6>Cattle Description : {value.cattle_des}</h6>
                                        <h6>Cattle City : {value.cattle_city}</h6>
                                        <h6>Cattle Price : {value.cattle_price}</h6>
                                        
                                    </Col>
                                    <Col>
                                    <Row>
                                        <Button style={{width: '4.5rem'}} variant='warning' onClick={() => { onEditCattle(value._id) }}>Edit</Button>
                                    </Row>
                                    <Row>    
                                        <Button style={{width: '4.5rem'}} variant='danger' onClick={() => { onDeleteCattle(value._id) }}>Delete</Button>
                                    </Row>
                                    </Col>
                                </Row>
                                <hr/>
                                </AnimationOnScroll>
                            </div>
                        )
                    })
                }
            </>
        )

    }

    const onDeleteCattle = async (id) => {
        // console.log(id);
        await fetch(`/delete/${id}`, {
            method: 'POST',
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data.delete);
                if (data.delete === 'true') {
                    window.alert('Cattle deleted successfully');
                    history.push('/account');
                }
            }).catch((error) => {
                // console.log(error);
            })
        }).catch((error) => {
            // console.log(error);
        })
    }

    const onEditCattle = (id) => {

        //Passing edit cattle id to EditCattleForm
        Edit_CattleID_Dispatch({
            payload: id
        })

        history.push('/edit-cattle');
        return null;
    }


    useEffect(() => {
        ShowData();
    }, []);

    return (
        <>
           <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '150%', maxWidth: '150%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={550}
            >
            <div  className="sc-body">
            <Container fluid>
                
                
                    <div>
                        <h1>My Cattles</h1>
                        <hr/>
                        
                        <ShowList />
                    </div>
                    
            </Container>
            </div>
            </Parallax>
            <Footer/>

        </>
    )
}
export default ShowCattle;