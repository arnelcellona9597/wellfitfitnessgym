import React from 'react';

export default function MainBanner() {
    return (
       <> 
        <section className="hero-section">
            <div className="hs-slider owl-carousel">
            <div className="hs-item set-bg" data-setbg="/template/member/img/hero/hero-1.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                    <div className="hi-text">
                        <span>Get Started Today</span>
                        <h1>
                        Avail <strong>Our </strong>Membership 
                        </h1>
                        <a href="/plans" className="primary-btn">
                        View Pricing
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="hs-item set-bg" data-setbg="/template/member/img/hero/hero-2.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                    <div className="hi-text">
                      <span>Train with Experts</span>
                      <h1>
                          Book  <strong>Personal </strong> Trainer
                      </h1>
                      <a href="/trainor" className="primary-btn">
                        View Trainor
                      </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        <div className="gettouch-section">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="gt-text">
            <i className="fa fa-map-marker" />
            <p>
              2nd Crumb Street, Barangay Zone II,
              <br /> Digos, Philippines
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="gt-text">
            <i className="fa fa-mobile" />
            <ul> 
              <li>0955-3241-066</li>
              <li>0909-840-8341</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="gt-text email">
            <i className="fa fa-envelope" />
            <p>molaoshane@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
       </>
    );
}