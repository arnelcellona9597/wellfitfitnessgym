import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function MemberPlan() {
    const { get_all_plans, cu_user_id } = usePage().props;

    // State to store form data
    const [formData, setFormData] = useState({
        user_id: cu_user_id || "",
        plan_id: "",
    });

    // State for errors, success messages, and form visibility
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update user_id once on mount
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            user_id: cu_user_id || "",
        }));
    }, [cu_user_id]);

    // Handle form submission
    const handleSubmit = async (e, planId) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");
        setIsSubmitting(true);

        const formDataToSend = new FormData();
        formDataToSend.append("user_id", formData.user_id);
        formDataToSend.append("plan_id", planId);

        try {
            const response = await fetch("/member/plans", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                credentials: "same-origin", // Ensure cookies are included
                body: formDataToSend,
            });

            const result = await response.json();
            if (!response.ok) {
                setErrors({ general: result.message || "Error submitting!" });
                return;
            }

            window.location.href = `/member/plan/form/?id=${planId}`;
            
        } catch (error) {
            console.error("Error submitting:", error);
            setErrors({ general: "Something went wrong. Please try again!" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="pricing-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Our Membership Plans</span>
                                <h2>Choose the Best Plan for Your Fitness Journey</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {get_all_plans.map((plan) => (
                            <div className="col-lg-3 col-md-8" key={plan.id}>
                                <div className="ps-item">
                                    <h3>{plan.duration}</h3>
                                    <div className="pi-price">
                                        <h2>₱{parseInt(plan.price).toLocaleString()}</h2>
                                        <span>{plan.plan_name}</span>
                                    </div>
                                    <ul>
                                        <li>{plan.plan_description}</li>
                                    </ul>
                                    {errors.general && (
                                        <p className="alert alert-danger">{errors.general}</p>
                                    )}
                                    {successMessage && (
                                        <p className="alert alert-success">{successMessage}</p>
                                    )}
                                    <form onSubmit={(e) => handleSubmit(e, plan.id)}>
                                        <input type="hidden" value={formData.user_id} name="user_id" />
                                        <input type="hidden" value={plan.id} name="plan_id" />
                                        <button type="submit" className="primary-btn pricing-btn planBTN" disabled={isSubmitting}>
                                            {isSubmitting ? "Processing..." : "Avail Now"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
