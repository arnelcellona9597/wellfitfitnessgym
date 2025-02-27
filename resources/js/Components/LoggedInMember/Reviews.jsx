import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Reviews() {
    const { cu_user_id } = usePage().props;


    // State to store the form data
    const [formData, setFormData] = useState({
        user_id: cu_user_id,
        rate: "1", // ✅ Changed "rating" to "rate" to match the backend
        comment: "" 
    });

    // State for errors and success messages
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle change for textarea and other inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle rating selection
    const handleRatingChange = (event) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            rate: value, // ✅ Ensure "rate" is updated correctly
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/member/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors({ general: errorData.message || "Error submitting review!" });
                return;
            }

            const result = await response.json();
            console.log(result);

            setSuccessMessage("Your review has been successfully submitted.");
            setFormData({
                user_id: cu_user_id,
                rate: "1",
                comment: ""
            });
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting review:", error);
            setErrors({ general: "Something went wrong. Please try again!" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-section spad">
            <div className="container">
                <div className="col-lg-12 text-center">
                    <div className="leave-comment">
                        <div className="section-title contact-title text-center">
                            <h2>Write a Review</h2>
                        </div>

                        {errors.general && <p className="alert alert-danger">{errors.general}</p>}
                        {successMessage && <p className="alert alert-success">{successMessage}</p>}

                        {showForm && (
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="user_id" value={formData.user_id} />

                                {/* Star Rating Input */}
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <label key={value}>
                                            <input
                                                type="radio"
                                                name="rate" // ✅ Changed "rating" to "rate"
                                                value={value}
                                                checked={formData.rate === String(value)}
                                                onChange={handleRatingChange}
                                            />
                                            <i className={`fa fa-star ${formData.rate >= value ? "checked" : ""}`} />
                                        </label>
                                    ))}
                                </div>

                                {/* Review Message Textarea */}
                                <textarea
                                    placeholder="Enter Your Comment..."
                                    required
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                />

                                <br />
                                <button type="submit" className="color-white" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Review"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
