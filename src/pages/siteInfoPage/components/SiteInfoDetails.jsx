import React from 'react';

const SiteInfoDetails = ({ siteDetails }) => {
    return (
        <div className="rightInfo container col-md-6 order-md-2 p-0">
            <div className="info-text">
                <p>電話：{siteDetails.site_phone}</p>
                <p>地址：{siteDetails.site_add}</p>
                <div className="d-flex">
                    <div>
                        <p>開放時間：</p>
                    </div>
                    <div className="opentime">
                        <p>{
                            siteDetails.site_opentime.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))
                        }</p>
                    </div>
                </div>
                <div className="infoWeb">
                    <p>官方網站：</p>
                    <a href={siteDetails.site_web} target="_blank" rel="noopener noreferrer">{siteDetails.site_web}</a>
                </div>
            </div>
            <div className="addBtn text-end">
                <button
                    type="button"
                    className="addBtn btn btn-primary loadSchedule"
                    data-site-id={siteDetails.site_id}
                    data-site-name={siteDetails.site_name}
                    data-site-add={siteDetails.site_add}
                    data-site-info={siteDetails.site_info}
                    data-site-img={siteDetails.photo_one}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    加入行程
                </button>
            </div>
        </div>
    );
};

export default SiteInfoDetails;