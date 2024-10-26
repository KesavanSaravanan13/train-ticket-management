import React from 'react';

import seat01 from '../../assests/seat01.jpg';
import seat02 from '../../assests/seat02.jpg';
import seat03 from '../../assests/seat03.jpg';
import '../../css/IndexPage.css';
import { Row } from 'react-bootstrap';

const AutoCarousel = () => {
    return (
        <Row className='m-0 p-0 d-flex justify-content-center'>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src={seat01} className="d-block" alt="Seat 01" />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={seat02} className="d-block" alt="Seat 02" />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={seat03} className="d-block" alt="Seat 03" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </Row>
    );
};

export default AutoCarousel;
