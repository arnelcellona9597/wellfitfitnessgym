import React, { useState, useEffect } from 'react';

export default function Forgot() {
    const [formData, setFormData] = useState({ email: '' });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [resendTimer, setResendTimer] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors({ general: errorData.message || 'Wrong email or password!' });
                return;
            }

            const result = await response.json();
            console.log(result);

            if (result.email_verified_at === null) {
                setErrors({ general: 'Email is not yet verified!' });
            } else {
                setSuccessMessage('Please check your email to reset your password.');
                setResendTimer(60);
                setFormSubmitted(true);
            }
        } catch (error) {
            console.error('Error during activation:', error);
            setErrors({ general: 'Email account could NOT be found!' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getButtonLabel = () => {
        if (isSubmitting) return 'Submitting...';
        if (resendTimer > 0) return `Resend in ${resendTimer}s`;
        if (formSubmitted) return 'Resend Verification';
        return 'Submit';
    };

    return ( 
        <>
            <span className='bg-img-v-3'>
                <section className="section-404">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-404">
                                    <h1>Forgot Password</h1>
                                    <h3>Sign In to Access Your Fitness Journey</h3>
                                    <p>Sign in to your fitness account to manage your training plans, book classes, and monitor your progress today.</p>
                                
                                    {errors.general && <p className="alert alert-danger">{errors.general}</p>}
                                    {successMessage && <p className="alert alert-success">{successMessage}</p>}

                                    {showForm && (
                                        <form onSubmit={handleSubmit} className="search-404">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter email..."
                                                required
                                            />
                                            <br />
                                            <button 
                                                type="submit" 
                                                className="color-white" 
                                                disabled={isSubmitting || resendTimer > 0}
                                            >
                                                <i className="fa fa-sign-in"></i> {getButtonLabel()}
                                            </button>
                                        </form>
                                    )}
                                    
                                    <a href="/signup" className="fs-11 color-orange mb-3"><i className="fa fa-plus"></i> Don't have an account? Sign Up</a><br/>
                                    <a href="/signin" className="fs-11 color-orange mb-3"><i className="fa fa-sign-in"></i> Already have an account? Sign In</a><br/>
                                    <a href="/" className="fs-11 color-orange"><i className="fa fa-home"></i> Home Page</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </span>
        </>
    );
}
