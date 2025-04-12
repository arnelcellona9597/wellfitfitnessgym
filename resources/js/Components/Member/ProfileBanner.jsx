import React from 'react';

export default function ProfileBanner() {
    return (
       <> 
         
         <section
            className="breadcrumb-section  "
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/template/images/13.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
            <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                <div className="breadcrumb-text">
                    <h2>Profile</h2>
                    <div className="bt-option">
                    <a href="#">Home</a>
                    <span>Personal Information</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

 

       </>
    );
}