import React, { useState, useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import moment from "moment";

export default function AccountHistoryMembership() {

    const { get_membership_by_id, id } = usePage().props;

    const receiptRef = useRef(null);

 
    const handlePrint = () => {
        window.print();
    };



    return (
        <section className="thank-you-section ">
            <div className="thank-you-container" ref={receiptRef}>
                <img src="/template/member/img/blacklogo.webp"  class="seclogo"/>

                {get_membership_by_id?.start_date && (
                    <>
                        <h1>Membership Confirmation</h1>
                        <p>Thank you for subscribing to our gym membership.</p>
                    </>
                )}

                {!get_membership_by_id?.start_date && (
                    <>
                        <h1>Membership Request</h1>
                        <p>Please sunmit receipt to the gym staff and pay.</p>
                    </>
                )}

                <div className="receipt">
                    <h2>Receipt #{ get_membership_by_id.id }</h2>


                    <div className="receipt-item">
                        <span>Customer Name: &nbsp;&nbsp; </span>
                        <strong>{ get_membership_by_id.first_name }  { get_membership_by_id.last_name }</strong>
                    </div>
 
                    <div className="receipt-item">
                        <span>Plan: &nbsp;&nbsp; </span>
                        <strong>{ get_membership_by_id.plan_name }</strong>
                    </div>


                    <div className="receipt-item">
                        <span>Duration:&nbsp;&nbsp;</span>
                        <strong>{ get_membership_by_id.plan_duration }</strong>
                    </div>


                    {get_membership_by_id?.start_date && (
                        <>
                            <div className="receipt-item">
                                <span>Avail Date:</span>
                                <strong>
                                    {moment(get_membership_by_id.start_date).format("MMMM D, YYYY")}
                                </strong>
                            </div>
                            <div className="receipt-item">
                                <span>Valid Until:</span>
                                <strong>
                                    {moment(get_membership_by_id.end_date).format("MMMM D, YYYY")}
                                </strong>
                            </div>
                        </>
                    )}
                    <div className="receipt-item">
                        <span>Payment Method: &nbsp;&nbsp;</span>
                        <strong>{get_membership_by_id.payment_method}</strong>
                    </div>


                    <div className="receipt-item">
                        <span>Membership Status: &nbsp;&nbsp;</span>
                        <strong>{get_membership_by_id.status}</strong>
                    </div>
                    
                    {!get_membership_by_id?.start_date && (
                        <>
                            <div className="receipt-item">
                                <span>Amount to pay:&nbsp;&nbsp;</span>
                                <strong>₱{parseInt(get_membership_by_id.plan_price).toLocaleString()}</strong>
                            </div>
                        </>
                    )}

                    {get_membership_by_id?.start_date && (
                        <>

                        <div className="receipt-item">
                            <span>Amount Paid:&nbsp;&nbsp;</span>
                            <strong>₱{parseInt(get_membership_by_id.plan_price).toLocaleString()}</strong>
                        </div>
                        </>
                    )}


                    <div className="receipt-item">
                        <p>{ get_membership_by_id.plan_description }</p>
                    </div>

                </div>

                <button className="btn print-btn" onClick={handlePrint}>
                    Print Receipt
                </button>
            </div>
        </section>
    );
}
