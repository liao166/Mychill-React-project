import React from 'react';

const ImageGallery = ({ photos }) => {
    const changeImage = (image) => {
        document.getElementById("mainImage").src = image; // Update the main image
    };

    return (
        <div className="leftImage col-md-6 order-md-1 d-none d-md-block">
            <div className="container p-0">
                <div className="row">
                    <div className="mainImage col-md-12 text-center">
                        <img
                            id="mainImage"
                            src={`/images/searchSite/${photos[0]}`}
                            className="img-fluid"
                            alt="主圖"
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    {photos.map((photo, index) => (
                        <div className="smallImage col-md-3 text-center" key={index}>
                            <img
                                src={`/images/searchSite/${photo}`}
                                className="p-0 thumbnail img-thumbnail"
                                alt={`縮圖${index + 1}`}
                                onClick={() => changeImage(`/images/searchSite/${photo}`)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;