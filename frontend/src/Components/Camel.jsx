import Header from './Header';
import { Container, Row, Col } from "react-bootstrap";
import '../css_files/camel.css';
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import CardA from './Card';

//For parallax
import img1 from '../img/1112.png';
import { Parallax } from 'react-parallax';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';


const Camel = () => {

    const [state, setstate] = useState([]);
    const UploadPath = '/upload/';

    const GetCattlesData = async () => {
        const Selection = 'Camel';

        await fetch('/cattles', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Selection
            })
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setstate(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    // console.log(state);
    const ShowData = () => {
        return (
            <>
            <div className="camel-cards">
            <Row>
                {
                    state.map((value, index) => {
                        {/* console.log(value.cattle_type); */}
                        {/* console.log(UploadPath); */}
                        {/* console.log(value.image); */}
                                
                        return (
                            <div key={index}>
                                <Col xs={12} sm={6} md={4} lg={4}>
                                <AnimationOnScroll animateIn="animate__fadeIn">
                                    <CardA Title={value.cattle_name} Price={value.cattle_price} Image={UploadPath + value.image[0]} CattleId={value._id} />
                                </AnimationOnScroll>
                                </Col>
                            </div>
                        )

                    })
                }
            </Row>
            </div>
            </>
        )
    }

    useEffect(() => {
        GetCattlesData();
    }, []);

    return (
        <>
            <Header />
            <Parallax 
            bgImage={img1}
            bgImageStyle={{height: '140%', maxWidth: '100%', opacity: '0.90'}}
            blur={{ min: -1, max: 1 }}
            strength={550}
            >
            <Container fluid>
                <div className="Camel-body">
                        <h1>Camels</h1>
                        <hr/>
                        <ShowData />
                </div>        
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default Camel;