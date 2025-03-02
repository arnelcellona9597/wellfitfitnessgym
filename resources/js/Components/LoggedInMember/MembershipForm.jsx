import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Cookies from "js-cookie";

export default function MembershipForm() {
    const { get_plan_by_id, get_user_info, membership_verification_code } = usePage().props;
    const [step, setStep] = useState(1);
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [gcashNumber, setGcashNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("GCASH");
    const [errors, setErrors] = useState({});

    // Function to go to the next step with validation
    const nextStep = async () => {
        let validationErrors = {};
    
        if (step === 1 && !agreeChecked) {
            validationErrors.agree = "Please accept the terms and conditions before proceeding.";
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
                const postData = {
                    email: get_user_info.email,
                    plan_name: get_plan_by_id.plan_name,
                    price: get_plan_by_id.price,
                    duration: get_plan_by_id.duration,
                };
    
                const response = await fetch("/member/plan/form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                    },
                    body: JSON.stringify(postData),
                });
    
                const result = await response.json();
    
                if (!response.ok) {
                    setErrors({ general: result.message || "Error submitting!" });
                    return;
                }
                // console.log(result.membership_verification_code);
                // console.log(result.email1);
                
            } catch (error) {
                console.error("Error submitting:", error);
                setErrors({ general: "Something went wrong. Please try again!" });
                return;
            }
        }

        if ( step === 2) {
            const storedVerificationCode = Cookies.get("membership_verification_code");
            if (storedVerificationCode != verificationCode) {
                alart("Wrong verification code, Please check your email!.");
                setErrors({ general: result.message || "Wrong verification code, Please check your email!." });
                validationErrors.verificationCode = "Wrong verification code, Please check your email!.";
                return;
            }
        }

        if ( step === 3) {
            try {
                const response = await fetch('/gcash-payment', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        order_total:  get_plan_by_id.price,
                        plan_name: get_plan_by_id.plan_name,
                        duration: get_plan_by_id.duration,

                    }),
                });
    
                const data = await response.json();
              
    
                if (data.redirect_url) {
                    // Redirect user to the next step (step 2)
                    window.location.href = data.redirect_url;
                } else {
                    alert('Payment initiation failed. Please try again.');
                }
            } catch (error) {
      
                console.error('Payment initiation failed', error);
                alert('An error occurred while processing your payment. Please try again.');
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
                                    <h2>By purchasing a membership, you agree to these terms:</h2>

                                    <ul className="ul-element">
                                        <li>Memberships (1, 3, 6, and 12 months) are non-refundable.</li>
                                        <li>Access includes gym facilities, showers, WiFi, and expert staff.</li>
                                        <li>Proper attire and adherence to gym rules are required.</li>
                                        <li>Wellfit is not liable for injuries or lost items.</li>
                                        <li>Membership may be terminated for policy violations.</li>
                                        <li>Privacy is respected; data will not be shared without consent.</li>
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
                                    
                                    <button className="custom-orange-btn mt-3" onClick={nextStep}>
                                        Continue
                                    </button>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="section-title chart-calculate-title">
                                    <img src="/template/member/img/bg-portraite.webp" alt="image" className="bgPortraite1" />
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
                                    <img src="/template/member/img/bg-portraite.webp" alt="image" className="bgPortraite1" />
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
                                                <th>Membership Type:</th>
                                                <th>{get_plan_by_id.plan_name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="point">Price:</td>
                                                <td>₱{parseInt(get_plan_by_id.price).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="point">Duration:</td>
                                                <td>{get_plan_by_id.duration}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="payment-element-block mt-3 pt-2">
                                    <span className="orange-label">Select Payment Method:</span>
                                    <select 
                                        className="payment_method"
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
                                            value={gcashNumber}
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
                                    <img src="/template/member/img/bg-portraite.webp" alt="image" className="bgPortraite1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
