import React from 'react';

const SiteDescription = ({ site_info }) => {
    return (
        <div className="container col-md-12 order-md-3">
            <h2 className="detailsTitle">景點介紹</h2>
            <p className="detailsInfo">{site_info}</p>
        </div>
    );
};

export default SiteDescription;