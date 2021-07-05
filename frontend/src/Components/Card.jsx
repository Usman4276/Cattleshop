import { Card, Button } from "react-bootstrap";
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../css_files/Card.css'
import image from '../img/cow.jpg';
import { CattleIdContext } from './App';


const CardA = ({ Title, Des, Price, Image, CattleId }) => {

    const { CattleIddispatch } = useContext(CattleIdContext);
    const history = useHistory();

    const OnClickHandler = (cattleId) => {
        // console.log(cattleId);
        
        CattleIddispatch({
            type: cattleId
        })
        history.push('/cattle-details');
    }

    return (
        <React.Fragment>
            <div style={{marginTop:'2rem'}}>
            <Card style={{ width: '18rem'}}>
                <Card.Img variant="top" style={{ height: '13rem', width: '17rem', borderRadius: '15px'}} src={Image || image} />
                <Card.Body>
                    <Card.Title>{Title || "Title goes here"}</Card.Title>
                    <Card.Text>
                        {Des}
                    </Card.Text>
                    <Card.Title>{Price || "price goes here"}</Card.Title>
                    <Button className="Rbutton" variant="primary" onClick={() => { OnClickHandler(CattleId) }}>Buy Now</Button>
                </Card.Body>
            </Card>
            </div>
        </React.Fragment>
    );
}
export default CardA;