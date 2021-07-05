import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/about.css';
import Header from './Header';
import Footer from './Footer';
import { LoginContext } from './App';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router";

const MyOrders = () => {

    //Getting values using useContext 
    const { lstate } = useContext(LoginContext);

    //Declaring useStates
    const [CustomerOrders, setCustomerOrders] = useState([]);

    //Global variables
    let mylstate;

    //Upload folder path
    const UploadPath = '/upload/';

    const history = useHistory();

    //For getting ongoing login state on page reload
    if (lstate === null) {
        mylstate = localStorage.getItem('lstate');
    } else {
        mylstate = lstate
    }


    const GetCustomerOrders = async () => {

        if (mylstate === null) {
            window.alert('Please login to proceed further');
        } else {

            await fetch('/get-my-orders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mylstate
                })
            }).then((res) => {
                // console.log(res);
                res.json().then((data) => {
                    // console.log(data);
                    setCustomerOrders(data);
                }).catch((err) => {
                    // console.log(err);
                })
            }).catch((err) => {
                // console.log(err);
            })
        }
    }


    const onDelete = async (id) => {

        await fetch(`/del-my-orders/${id}`, {
            method: 'POST'
        }).then((res) => {
            // console.log(res);
            window.alert('Order deleted successfully');
            history.push('/account');
        }).catch((err) => {
            // console.log(err);
        })
    }

    const ShowCustomerOrders = () => {
        return (
            <>
                {
                    CustomerOrders.map((value, index) => {
                        return (
                            <div key={index}>

                                <h2><span style={{ 'color': 'blue' }}>My Order # {index + 1}</span></h2>

                                {
                                    value.imageArray.map((value, index) => {
                                        return (
                                            <div key={index}>
                                                <img src={UploadPath + value} alt="img" />
                                            </div>
                                        )
                                    })
                                }
                                <h6>Selected Consultant email : {value.selected_consultant_email}</h6>
                                <h6>Selected Pick & Drop email : {value.selected_pickdrop_email}</h6>
                                <h6>Cattle name : {value.cattle_name}</h6>
                                <h6>Cattle type : {value.cattle_type}</h6>
                                <h6>Cattle age : {value.cattle_age}</h6>
                                <h6>Cattle city : {value.cattle_city}</h6>
                                <h6>Cattle price : {value.cattle_price}</h6>
                                <h6>Supplier name : {value.supplier_name}</h6>
                                <br />
                                <Button variant='danger' onClick={() => { onDelete(value._id) }}>Delete</Button>
                                <br /><hr />

                            </div>
                        )
                    })
                }
            </>
        )
    }


    useEffect(() => {
        GetCustomerOrders();
    }, []);


    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col className="my_body">
                        <br />
                        <br />
                        <h1>My orders</h1>
                        <ShowCustomerOrders />

                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
export default MyOrders;