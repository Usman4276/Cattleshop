import { Card, Button } from "react-bootstrap"
import React from 'react'
import '../css_files/Card.css'
import image from '../img/cow.jpg'
import { Link } from 'react-router-dom';

function Cards({ Title, Des, Image, btntxt, goto }) {

    return (
        <React.Fragment>
            <div style={{ marginTop: '2rem' }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" style={{ height: '13rem', width: '17rem', borderRadius: '18px' }} src={Image || image} />
                    <Card.Body>
                        <Card.Title >{Title || <span style={{ 'color': 'red' }}>Coming soon</span>} </Card.Title>
                        <Card.Text>
                            {Des}
                        </Card.Text>
                        <Link to={goto}><Button class="Rbutton" variant="primary">{btntxt || "Register"}</Button></Link>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    );
}
export default Cards;