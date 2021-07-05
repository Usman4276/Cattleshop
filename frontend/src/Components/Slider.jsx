import { Carousel } from "react-bootstrap"
import React from 'react'

function Sliderahs({image1,image2,image3}){
    return(
        <React.Fragment>
        <Carousel className="slidera">
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={image1}
                alt="First slide" height="600rem" 
                />
                
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={image2}
                alt="Second slide" height="600rem" 
                />

                
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={image3}
                alt="Third slide" height="600rem" 
                />

                
            </Carousel.Item>
        </Carousel>
        </React.Fragment>
    );
}
export default Sliderahs;