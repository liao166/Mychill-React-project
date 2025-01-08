import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileData from "./components/ProfileData";

function Profile() {
    return (
        <div className="member">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 text-center">
                        <Sidebar/>
                    </div>
                    <div className="col-md-10 personaldata">
                        <ProfileData/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;