import React from "react";

const TopImage = ({ photo }) => (
    <div className="topImage container-fluid p-0 bg-primary">
        <img src={`/images/searchSite/${photo}`} className="img-fluid" alt="大圖" />
    </div>
);

export default TopImage;