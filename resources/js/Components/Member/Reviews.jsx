import React from 'react';

export default function Reviews() {
    return (
       <> 
        <>
  
  <section className="testimonial-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title">
            <span>Testimonial</span>
            <h2>Our client say</h2>
          </div>
        </div>
      </div>
      <div className="ts_slider owl-carousel">
        <div className="ts_item">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="ti_pic">
                <img src="/template/member/img/testimonial/testimonial-1.jpg" alt="" />
              </div>
              <div className="ti_text">
                <p>
                  "Joining this gym has completely transformed my life. The trainers
                  are incredibly knowledgeable, and the variety of equipment is
                  fantastic. I've gained strength, confidence, and feel healthier
                  than ever before!"
                </p>
                <h5>Sarah Johnson</h5>
                <div className="tt-rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ts_item">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="ti_pic">
                <img src="/template/member/img/testimonial/testimonial-2.jpg" alt="" />
              </div>
              <div className="ti_text">
                <p>
                  "I've been coming to this gym for six months, and the results have
                  been amazing! The personalized training plans are exactly what I
                  needed to achieve my fitness goals. The support from the staff
                  has been incredible!"
                </p>
                <h5>David Lee</h5>
                <div className="tt-rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="/signin/" className="primary-btn btn-normal appoinment-btn reviewsbtn">Login to Write Reviews</a>
    </div>
  </section>

</>

       </>
    );
}
