import React from 'react';

const Carousel = ({ photos }) => (
    <div id="carouselExample" className="carousel slide d-md-none col-md-6 order-md-1" data-bs-ride="carousel">
        <div className="carousel-inner">
            {photos.map((photo, index) => (
                <div className={`siteCarouselItem carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img src={`/images/searchSite/${photo}`} className="d-block w-100" alt={`圖片 ${index + 1}`} />
                </div>
            ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
);

export default Carousel;