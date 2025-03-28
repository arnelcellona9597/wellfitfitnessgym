import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Cookies from "js-cookie";
import dayjs from "dayjs";

export default function TrainorForm() {

    const { get_trainer_by_id, get_user_info } = usePage().props;
    const [step, setStep] = useState(1);
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [gcashNumber, setGcashNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("GCASH");
    const [errors, setErrors] = useState({});

     // Extract number of months
     const durationMonths = parseInt(get_trainer_by_id.duration);

     // Calculate start and end date
     const startDate = dayjs();
     const endDate = startDate.add(durationMonths, 'month');
     

    // console.log("durationMonths: " + durationMonths);
    // console.log("startDate: " + startDate.format("YYYY-MM-DD HH:mm:ss"));
    // console.log("endDate: " + endDate.format("YYYY-MM-DD HH:mm:ss"));
    const [minDate, setMinDate] = useState("");

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setMinDate(tomorrow.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }, []);
 

    
    useEffect(() => {
        if (get_user_info.phone) {
            setGcashNumber(get_user_info.phone);
        }
    }, [get_user_info.phone]);
    


    // Function to go to the next step with validation
    const nextStep = async (event) => {

        event.preventDefault();

        let validationErrors = {};
    
        if (step === 1 && !agreeChecked) {
            validationErrors.agree = "Please accept the terms and conditions before proceeding.";
            setErrors(validationErrors); // Ensure errors are updated
    
        }
        
    
        if (step === 2 && !verificationCode.trim()) {
            validationErrors.verificationCode = "Please enter the verification code sent to your email.";
          
        }
    
        if (step === 3 && paymentMethod === "GCASH" && !gcashNumber.trim()) {
            validationErrors.gcash = "Please enter your GCASH number.";
           
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        setErrors({});

    
    
        if (step === 1) {

            try {
                const response = await fetch("/member/trainor/form", {  
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                    },
                    body: JSON.stringify({

                        email: get_user_info.email,
                        trainer_name: get_trainer_by_id.trainer_name,
                        trainer_image: get_trainer_by_id.trainer_image
                        
                    }),
                });
            
                if (!response.ok) {
                    const result = await response.json();
                    
                    setErrors({ general: result.message || "Error submitting!" });
                    return;
                }
            } catch (error) {
                console.error("Error submitting:", error);
                setErrors({ general: "Something went wrong. Please try again!" });
                return;
            }

            
        }

        if ( step === 2) {
            const storedVerificationCode = Cookies.get("trainer_verification_code");
            if (storedVerificationCode != verificationCode) {
                validationErrors.verificationCode = "Wrong verification code, Please check your email!.";
                setErrors(validationErrors);
                return;
            }

        }
 
        if ( step === 3) {
        

            if ( paymentMethod == "GCASH" ) {
                // try {

  
                //     const response = await fetch('/gcash-payment', {
                //         method: 'POST', 
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({ 

                //             customer_name:  get_user_info.first_name + " " + get_user_info.last_name,
                //             phone:  get_user_info.phone,
                //             email:  get_user_info.email,
                //             user_id:  get_user_info.id,
                //             plan_id:  get_trainer_by_id.id,
                //             plan_duration:  get_trainer_by_id.duration,		
                //             plan_price:  get_trainer_by_id.price,		
                //             plan_name:  get_trainer_by_id.plan_name,		
                //             plan_description:  get_trainer_by_id.plan_description,
                //             payment_method:  paymentMethod,
                //             payment_date: startDate.format("YYYY-MM-DD HH:mm:ss"),
                //             start_date: startDate.format("YYYY-MM-DD HH:mm:ss"),
                //             end_date:  endDate.format("YYYY-MM-DD HH:mm:ss"),
                //             status: 'Approve'
                      
                //         }),
                //     }); 
        
                //     const data = await response.json();

                //     console.log("Sending Data:", data);
                    
        
                //     if (data.redirect_url) {
                //         // Redirect user to the next step (step 2)
                //         window.location.href = data.redirect_url;
                //     } else {
                //         alert('Payment initiation failed. Please try again.');
                //     }
                // } catch (error) {
        
                //     console.error('Payment initiation failed', error);
                //     alert('An error occurred while processing your payment. Please try again.');
                // }
            }
            else {


  
                // try {
                //     const response = await fetch('/over-the-counter-payment', {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //             "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                //         },
                //         body: JSON.stringify({
                            
                //             user_id:  get_user_info.id,
                //             plan_id:  get_trainer_by_id.id,
                //             plan_duration:  get_trainer_by_id.duration,		
                //             plan_price:  get_trainer_by_id.price,		
                //             plan_name:  get_trainer_by_id.plan_name,		
                //             plan_description:  get_trainer_by_id.plan_description,
                //             payment_method:  paymentMethod,
                //             // payment_date: new Date().toISOString().slice(0, 19).replace("T", " "),
                //             // start_date: startDate.format("YYYY-MM-DD HH:mm:ss"),
                //             // end_date:  endDate.format("YYYY-MM-DD HH:mm:ss"),
                //             status: 'Pending'
                //         }),
                //     });
            
                //     if (!response.ok) {
                //         const result = await response.json();
                //         setErrors({ general: result.message || "Error submitting!" });
                //         return;
                //     }
                //     else {
                //         window.location.href = "/member/plan/thank-you";
                //     }
                // } catch (error) {
                //     console.error("Error submitting:", error);
                //     setErrors({ general: "Something went wrong. Please try again!" });
                //     return;
                // }
 
            }
            
        }


        
        setStep((prev) => Math.min(prev + 1, 3));
    };
    

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <>
            {/* Step 1: Terms and Conditions */}
            {step === 1 && (
                <section className="bmi-calculator-section spad pt-230 step-nav-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="section-title chart-title">
                                    <span> Wellfit Fitness Gym - Terms and Conditions</span>
                                    <h2>By booking our gym trainor, you agree to these terms:</h2>

                                    <ul className="ul-element">
                                        <li>Training sessions run daily from 8 AM to 5 PM.</li>
                                        <li>Each session lasts 1 hour and 30 minutes.</li>
                                        <li>Trainer fee: ₱2,000 per month.</li>
                                        <li>Bookings must be made at least 24 hours in advance and are subject to trainer availability.</li>
                                        <li>Payments are non-refundable once a trainer is booked.</li>
                                        <li>Proper gym attire is required during training sessions.</li>
                                        <li>Clients must follow the trainer’s guidance to ensure safety and effectiveness.</li>
                                        <li>Wellfit is not liable for injuries sustained during training sessions.</li>
                                        <li>All personal information is kept confidential and will not be shared without consent.</li>
                                    </ul>



                                    <label className="agree-checkbox">
                                        <input
                                            type="checkbox"
                                            name="agree"
                                            checked={agreeChecked}
                                            onChange={(e) => setAgreeChecked(e.target.checked)}
                                        />{" "}
                                        &nbsp; I agree to the terms and conditions stated above.
                                    </label>

                                    {errors.agree && (
                                        <p className="alert alert-danger">{errors.agree}</p>
                                    )}
                                    
                                    <button type="button" className="custom-orange-btn mt-3" onClick={nextStep}>
                                        Continue
                                    </button>

                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="section-title chart-calculate-title">
                                <img src={`/template/images/${get_trainer_by_id.trainer_image}`} alt="Trainer Image" className="bgPortraite1 trainorIMGLeft" />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Step 2: Email Verification */}
            {step === 2 && (
                <section className="bmi-calculator-section spad pt-230 step-nav-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="section-title chart-title">
                                    <span>Email Verification</span>
                                    <h2>We sent a verification code to your registered email</h2>

                                    <p className="mb-3 pb-3">
                                        For enhanced security, please enter the verification code we sent to your email in the field below. 
                                        This helps us ensure that your account remains protected and accessible only to you. 
                                        If you haven’t received the code, please check your spam folder or request a new one.
                                    </p>

                                    <input
                                        type="text"
                                        name="verification_code"
                                        placeholder="Enter verification code"
                                        value={verificationCode}
                                        className="col-12"
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                    />

                                    {errors.verificationCode && (
                                        <p className="alert alert-danger">{errors.verificationCode}</p>
                                    )}

                                    <button className="custom-orange-btn mt-3" onClick={nextStep}>
                                        Continue
                                    </button>
                                    <button className="custom-orange-btn mt-3" onClick={prevStep}>
                                        Back
                                    </button>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="section-title chart-calculate-title">
                                <img src={`/template/images/${get_trainer_by_id.trainer_image}`} alt="Trainer Image" className="bgPortraite1 trainorIMGLeft" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
                <section className="bmi-calculator-section spad pt-230 step-nav-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="section-title chart-title">
                                    <span>Select Payment Method</span>
                                    <h2>Please select whether Over-the-Counter or GCash payment</h2>
                                </div>

                                <div className="chart-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Trainer's Name:</th>
                                                <th>{get_trainer_by_id.trainer_name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="point">Price:</td>
                                                <td>₱2000 per Month</td>
                                            </tr>
                                            <tr>
                                                <td className="point">Session Time:</td>
                                                <td>1 hour and 30 minutes per day</td>
                                            </tr>

                                            <tr>
                                                <td className="point">Duration:</td>
                                                <td>3 Months</td>
                                            </tr>

                                            <tr>
                                                <td className="point">Total Price:</td>
                                                <td>₱6000 per Month</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>


                                <div className="payment-element-block mt-3 pt-2">
                                    <span className="orange-label">Select Schedule:</span>
                                   
                                    <input type="date" min={minDate} />
                                    <select>
                                        <option value="8:00am - 9:30am">8:00am - 9:30am</option>
                                        <option value="9:30am - 11:00am">9:30am - 11:00am</option>
                                        <option value="11:00am - 12:30pm">11:00am - 12:30pm</option>
                                        <option value="12:30pm - 2:00pm">12:30pm - 2:00pm</option>
                                        <option value="2:00pm - 3:30pm">2:00pm - 3:30pm</option>
                                    </select>
                                    <select>
                                        <option value="1 Month">1 Month</option>
                                        <option value="3 Month">3 Months</option>
                                        <option value="6 Months">6 Months</option>
                                        <option value="12 Months">12 Months</option>
                                     </select>
                                </div>

                                <div className="payment-element-block mt-3 pt-2">
                                    <span className="orange-label">Select Payment Method:</span>
                                    <select 
                                        className="payment_method" name="payment_method"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option selected value="GCASH">GCASH</option>
                                        <option value="Over The Counter">Over The Counter</option>
                                    </select>

                                    {paymentMethod === "GCASH" && (
                                       <input
                                       type="number"
                                       name="gcash"
                                       placeholder="Enter GCASH Number"
                                       value={gcashNumber} // Ensure it's bound to the state
                                       onChange={(e) => setGcashNumber(e.target.value)}
                                   />
                               
                                    
                                    )}

                                    {errors.gcash && (
                                        <p className="alert alert-danger">{errors.gcash}</p>
                                    )}

                                    <button className="custom-orange-btn mt-3" onClick={nextStep}>
                                        Pay
                                    </button>
                                    <button className="custom-orange-btn mt-3 " onClick={prevStep}>
                                        Back
                                    </button>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="section-title chart-calculate-title">
                                <img src={`/template/images/${get_trainer_by_id.trainer_image}`} alt="Trainer Image" className="bgPortraite1 trainorIMGLeft" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
