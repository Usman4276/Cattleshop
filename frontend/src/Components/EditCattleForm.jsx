import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '../css_files/about.css';
import Header from './Header';
import Footer from './Footer';
import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { Edit_CattleID } from './App';
import { useHistory } from "react-router";

const EditCattleForm = () => {

    const { Edit_CattleID_State } = useContext(Edit_CattleID);
    const [EditCattleDetails, setEditCattleDetails] = useState([]);
    const [imgState, setimgState] = useState('');
    const [Img_details, setImg_details] = useState([]);
    const supplier_email = localStorage.getItem('lstate');

    const history = useHistory();


    const [Cattle, setCattle] = useState({
        cattle_name: '',
        cattle_age: '',
        cattle_des: '',
        cattle_city: '',
        cattle_price: '',
    });
    const [cattle_type, setCattle_type] = useState('')

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

    //Global variables
    let myCattleId;


    //For loading previous state
    if (EditCattleDetails === null) {
        myCattleId = localStorage.getItem('EditCattleId');
    } else {
        myCattleId = Edit_CattleID_State;
        localStorage.setItem('EditCattleId', myCattleId);
    }

    //Getting selected edit cattle data
    const GetCattleData = async () => {

        await fetch(`/cattle-details/${myCattleId}`, {
            method: 'POST',
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setEditCattleDetails([data]);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    // console.log(EditCattleDetails);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCattle({ ...Cattle, [name]: value });

        setimgState(e.target.files);
    }

    const getOptionValue = (e) => {
        setCattle_type(e.label);
    }

    // console.log(cattle_type);
    // console.log(imgState);

    //On upload image handler
    const onUploadHandler = async () => {
        const formdata = new FormData();

        for (const key in imgState) {
            formdata.append('files', imgState[key]);
        }

        // //You cant do simple console on formdata to see its values below is the way to do that.
        // console.log(formdata.get('files'));

        if (imgState.length > 3) {
            window.alert('Image limit exceeded [Max-Limit = 3]');
        } else {

            await fetch('/upload', {
                method: 'POST',
                body: formdata
            }).then((res) => {
                // console.log(res);
                window.alert('Image uploaded successfully');
                res.json().then((data) => {
                    // console.log(data);
                    setImg_details([data]);
                }).catch((err) => {
                    // console.log(err);
                })

            }).catch((err) => {
                // console.log(`error of image ${err}`);

            })
        }
    }

    // console.log(Img_details);

    const onUpdate = async () => {
        let img_name = [];
        const { cattle_name, cattle_age, cattle_des, cattle_city, cattle_price } = Cattle;


        Img_details.flatMap(value => value.img.map((value, index) => {
            img_name[index] = value.filename;
        }))

        await fetch(`/update-cattle/${Edit_CattleID_State}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                img_name, cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_email
            })

        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                window.alert('Cattle updated successfully');
                history.push('/show-cattles');
            }).catch((err) => {
                // console.log(err);
                window.alert('Cattle updated failed');
            })
        }).catch((err) => {
            // console.log(`no saved data to db 😠 ${err}`);
        })

    }

    const ShowingPrev_data = () => {

        return (
            <>
                {
                    EditCattleDetails.map((value, index) => {

                        return (
                            <div key={index}>
                                <Form.Group id="myForm" >
                                    <Form.Label>Cattle image :</Form.Label>
                                    <Form.Control type="file" multiple onChange={onChangeHandler} accept=".png,.jpg,.jpeg,.HEIF,.HEVC " />
                                    <br />
                                    <Button variant="success" onClick={onUploadHandler} >upload</Button>
                                    <br />
                                    <br />
                                    <Form.Label>Cattle Name:</Form.Label>
                                    <Form.Control type="text" name='cattle_name' onChange={onChangeHandler} value={Cattle.cattle_name} placeholder={value.cattle_name} />
                                    <Form.Label>Cattle type:</Form.Label>
                                    <Select options={select} onChange={getOptionValue} placeholder={value.cattle_type} />
                                    <Form.Label>Cattle age:</Form.Label>
                                    <Form.Control type="number" name='cattle_age' onChange={onChangeHandler} value={Cattle.cattle_age} placeholder={value.cattle_age} />
                                    <Form.Label>Cattle description:</Form.Label>
                                    <Form.Control type="text" name='cattle_des' onChange={onChangeHandler} value={Cattle.cattle_des} placeholder={value.cattle_des} />
                                    <Form.Label>Cattle city:</Form.Label>
                                    <Form.Control type="text" name='cattle_city' onChange={onChangeHandler} value={Cattle.cattle_city} placeholder={value.cattle_city} />
                                    <Form.Label>Cattle price:</Form.Label>
                                    <Form.Control type="number" name='cattle_price' onChange={onChangeHandler} value={Cattle.cattle_price} placeholder={value.cattle_price} />
                                    <br />
                                    <Button variant="warning" type="submit" onClick={onUpdate} >Update</Button>
                                </Form.Group>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    useEffect(() => {
        GetCattleData();
    }, [])

    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col className="my_body">
                        <br />
                        <br />
                        <h1>Edit Cattle</h1>
                        <ShowingPrev_data />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
export default EditCattleForm;