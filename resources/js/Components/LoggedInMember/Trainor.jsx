import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

 
 
export default function Trainor() {
  const { trainers, cu_user_id } = usePage().props;
    return (
       <>

<section className="team-section spad">
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="team-title">
        <div className="section-title">
          <span>Our Trainers</span>
          <h2>TRAIN WITH EXPERTS</h2>
        </div>
        {/* <a href="/trainor" className="primary-btn btn-normal appoinment-btn">
          Book Trainor
        </a> */}
      </div>
    </div>
  </div>
  <div className="row">
    <div className="ts-slider owl-carousel">
     {trainers.map((trainer) => (
        <div className="col-lg-4">
          <div className="ts-item set-bg" data-setbg={`/template/images/${trainer.trainer_image}`}>
            <div className="ts_text">
              <h4>{trainer.trainer_name}</h4>
              <span>₱2,000/Month · 1h 30m/Day</span>
              <span>{trainer.log_description}</span>
              <a href={`/member/trainor/form?id=${trainer.id}`}  className="primary-btn btn-normal appoinment-btn">Book Trainer</a>
            </div>
          </div>
        </div>
      ))}    
      
    </div>
  </div>
</div>
</section>
       </> 
    ) 
}