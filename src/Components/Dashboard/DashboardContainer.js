import React from 'react';
import SideVarNav from './SidvarNav/SideVarNav';

const DashboardContainer = ({ children, pageTitle }) => {
    return (
        <div className="container-fluid px-0 over-hide ">
            <div className="row ">
                <SideVarNav />
                <div style={{ backgroundColor: "#F4FDFB", }} className="col-md-9 shadow  p-0  pb-5">
                    <h3 className="text-muted text-center bg-light py-2  mt-5">{pageTitle} </h3>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardContainer;