import React, { useState, useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import moment from "moment";

export default function PlanSuccess() {

    const { get_user_latest_booktrainor, get_trainer_by_id } = usePage().props;

    const receiptRef = useRef(null);

    get_user_latest_booktrainor
    const handlePrint = () => {
        window.print();
    };

    return (
        <section className="thank-you-section ">
            <div className="thank-you-container" ref={receiptRef}>
                <img src="/template/member/img/blacklogo.webp"  class="seclogo"/>


                {get_user_latest_booktrainor?.trainer_status === "Pending" && (
                                        <>
                                        <h1>Booking Trainer Request</h1>
                                        <p>Please sunmit receipt to the gym staff and pay.</p>
                                    </>
                    )}

                    {get_user_latest_booktrainor?.trainer_status === "Approve" && (
                                     <>

                                     <h1>Trainer Booking Confirmation</h1>
                                     <p>Thank you for trusting our professional gym trainer.</p>
             
                                 </>
                    )}
   
                <div className="receipt">
                    <h2>Receipt #{ get_user_latest_booktrainor.id }</h2>


                    <div className="receipt-item">
                        <span>Customer Name: &nbsp;&nbsp; </span>
                        <strong>{ get_user_latest_booktrainor.first_name }  { get_user_latest_booktrainor.last_name }</strong>
                    </div>

                    <div className="receipt-item">
                        <span>Trainer Name: &nbsp;&nbsp; </span>
                        <strong>{ get_user_latest_booktrainor.trainer_name }</strong>
                    </div>


                    <div className="receipt-item">
                        <span>Duration:&nbsp;&nbsp;</span>
                        <strong>{ get_user_latest_booktrainor.trainer_duration }</strong>
                    </div>



              

                    <div className="receipt-item">
                        <span>Training Session Start:</span>
                        <strong>
                            {moment(get_user_latest_booktrainor.trainer_start_date).format("MMMM D, YYYY")}
                        </strong>
                    </div>
                    <div className="receipt-item">
                        <span>Training Session End:</span>
                        <strong>
                            {moment(get_user_latest_booktrainor.trainer_end_date).format("MMMM D, YYYY")}
                        </strong>
                    </div>

                    <div className="receipt-item">
                        <span>Time Schedule:</span>
                        <strong>
                            {get_user_latest_booktrainor.trainer_time_schedule}
                        </strong>
                    </div>


                    <div className="receipt-item">
                        <span>Payment Method: &nbsp;&nbsp;</span>
                        <strong>{get_user_latest_booktrainor.trainer_payment_method}</strong>
                    </div>



                    <div className="receipt-item">
                        <span>Booking Status: &nbsp;&nbsp;</span>
                        <strong>{get_user_latest_booktrainor.trainer_status}</strong>
                    </div>

                    {get_user_latest_booktrainor?.trainer_status === "Pending" && (
                        <div className="receipt-item">
                            <span>Amount to pay:&nbsp;&nbsp;</span>
                            <strong>₱{parseInt(get_user_latest_booktrainor.trainer_total_price).toLocaleString()}</strong>
                        </div>
                    )}

                    {get_user_latest_booktrainor?.trainer_status === "Approve" && (
                        <div className="receipt-item">
                            <span>Amount Paid:&nbsp;&nbsp;</span>
                            <strong>₱{parseInt(get_user_latest_booktrainor.trainer_total_price).toLocaleString()}</strong>
                        </div>
                    )}



 
 
 


                    <div className="receipt-item">
                        <p>{ get_user_latest_booktrainor.plan_description }</p>
                    </div>

                </div>

                <button className="btn print-btn" onClick={handlePrint}>
                    Print Receipt 
                </button>
            </div>
        </section>
    );
}
