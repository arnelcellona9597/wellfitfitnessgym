import React, { useState, useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
import Cookies from "js-cookie";
import dayjs from "dayjs"; 
import moment from "moment";

export default function AccountHistoryBookTrainor() {

    const { get_booktrainer_by_id } = usePage().props;

    const receiptRef = useRef(null);
 
     
    const handlePrint = () => {
        window.print();
    };

    return (
        <section className="thank-you-section ">
            <div className="thank-you-container" ref={receiptRef}>
                <img src="/template/member/img/blacklogo.webp"  class="seclogo"/>


                {get_booktrainer_by_id?.trainer_status === "Pending" && (
                                        <>
                                        <h1>Booking Trainer Request</h1>
                                        <p>Please sunmit receipt to the gym staff and pay.</p>
                                    </>
                    )}

                    {get_booktrainer_by_id?.trainer_status === "Approved" && (
                                     <>

                                     <h1>Trainer Booking Confirmation</h1>
                                     <p>Thank you for trusting our professional gym trainer.</p>
             
                                 </>
                    )}


   
                <div className="receipt">
                    <h2>Receipt #{ get_booktrainer_by_id.id }</h2>


                    <div className="receipt-item">
                        <span>Customer Name: &nbsp;&nbsp; </span>
                        <strong>{ get_booktrainer_by_id.first_name }  { get_booktrainer_by_id.last_name }</strong>
                    </div>

                    <div className="receipt-item">
                        <span>Trainer Name: &nbsp;&nbsp; </span>
                        <strong>{ get_booktrainer_by_id.trainer_name }</strong>
                    </div>

                    <div className="receipt-item">
                        <span>Duration:&nbsp;&nbsp;</span>
                        <strong>{ get_booktrainer_by_id.trainer_duration }</strong>
                    </div>


                    <div className="receipt-item">
                        <span>Training Session Start:</span>
                        <strong>
                            {moment(get_booktrainer_by_id.trainer_start_date).format("MMMM D, YYYY")}
                        </strong>
                    </div>
                    <div className="receipt-item">
                        <span>Training Session End:</span>
                        <strong>
                            {moment(get_booktrainer_by_id.trainer_end_date).format("MMMM D, YYYY")}
                        </strong>
                    </div>

                    <div className="receipt-item">
                        <span>Time Schedule:</span>
                        <strong>
                            {get_booktrainer_by_id.trainer_time_schedule}
                        </strong>
                    </div>

                    <div className="receipt-item">
                        <span>Payment Method: &nbsp;&nbsp;</span>
                        <strong>{get_booktrainer_by_id.trainer_payment_method}</strong>
                    </div>



                    <div className="receipt-item">
                        <span>Booking Status: &nbsp;&nbsp;</span>
                        <strong>{get_booktrainer_by_id.trainer_status}</strong>
                    </div>

                    {get_booktrainer_by_id?.trainer_status === "Pending" && (
                        <div className="receipt-item">
                            <span>Amount to pay:&nbsp;&nbsp;</span>
                            <strong>₱{parseInt(get_booktrainer_by_id.trainer_total_price).toLocaleString()}</strong>
                        </div>
                    )}

                    {get_booktrainer_by_id?.trainer_status === "Approved" && (
                        <div className="receipt-item">
                            <span>Amount Paid:&nbsp;&nbsp;</span>
                            <strong>₱{parseInt(get_booktrainer_by_id.trainer_total_price).toLocaleString()}</strong>
                        </div>
                    )}



 
 


                    <div className="receipt-item">
                        <p>{ get_booktrainer_by_id.plan_description }</p>
                    </div>

                </div>

                <button className="btn print-btn" onClick={handlePrint}>
                    Print Receipt 
                </button>
            </div>
        </section>
    );
}
