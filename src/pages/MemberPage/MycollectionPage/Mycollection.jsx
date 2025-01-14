import React from "react";
import Sidebar from "../components/Sidebar";
import MycollectionData from "./components/MycollectionData";

function Mycollection() {
    return (
        <div className="member">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 text-center">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 mycollection">
                        <MycollectionData />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mycollection;