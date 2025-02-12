import React from 'react';

export default function AboutWhatWeHaveDone() {
    return (
       <> 
        <>
  
        <section className="aboutus-section">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 p-0">
          <div className="about-video set-bg" data-setbg="/template/member/img/about-us.jpg">
            <a
              href="https://www.youtube.com/watch?v=Pn3BwxVh_S8"
              className="play-btn video-popup"
            >
              <i className="fa fa-caret-right" />
            </a>
          </div>
        </div>
        <div className="col-lg-6 p-0">
          <div className="about-text">
            <div className="section-title">
              <span>About Us</span>
              <h2>What we have done at Wellfit Fitness Gym</h2>
            </div>
            <div className="at-desc">
              <p>
                At Wellfit Fitness Gym, we have helped countless clients
                transform their lives through fitness. Our mission is to provide 
                the tools, training, and support needed to achieve personal and 
                fitness goals. Whether you're looking to build strength, improve 
                endurance, or maintain overall health, we’ve been there every step
                of the way for our members. We take pride in our tailored approach 
                and individualized fitness plans that lead to sustainable results.
              </p>
            </div>
            <div className="about-bar">
              <div className="ab-item">
                <p>Bodybuilding</p>
                <div id="bar1" className="barfiller">
                  <span className="fill" data-percentage={80} />
                  <div className="tipWrap">
                    <span className="tip" />
                  </div>
                </div>
              </div>
              <div className="ab-item">
                <p>Training</p>
                <div id="bar2" className="barfiller">
                  <span className="fill" data-percentage={85} />
                  <div className="tipWrap">
                    <span className="tip" />
                  </div>
                </div>
              </div>
              <div className="ab-item">
                <p>Fitness</p>
                <div id="bar3" className="barfiller">
                  <span className="fill" data-percentage={75} />
                  <div className="tipWrap">
                    <span className="tip" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</>

       </>
    );
}
