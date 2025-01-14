import React from "react";
import Sidebar from "../components/Sidebar";
import MytripData from "./components/MytripData";

function Mytrip() {
    return (
        <div className="member">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 text-center">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 mytrip">
                        <MytripData />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mytrip;