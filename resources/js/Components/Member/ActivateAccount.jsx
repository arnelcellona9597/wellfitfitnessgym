import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function ActivateAccount() {

    const { email, verification_code } = usePage().props; 
    const [formData, setFormData] = useState({
        verification_code: verification_code || '',
        email: email || ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevent multiple submissions

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');
        setIsSubmitting(true);
    
        // Destructure formData to get the values
        const { confirmation_code, verification_code, email } = formData;
    
        try {
            // Compare entered confirmation code with the verification code
            if (verification_code === confirmation_code) {

                const response = await fetch('/activate-account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                    },
                    body: JSON.stringify(formData)
                });
    
                const result = await response.json();
                // console.log("response:", response);
                // console.log("result:", result);
    
                // Show success message
                setSuccessMessage('Account activated successfully! Redirecting to login page...');
    
                setTimeout(() => {
                    window.location.href = '/signin/';
                }, 3000);

                // Reset form data
                setFormData({
                    verification_code: verification_code || '',
                    email: email || ''
                });
    
                // Hide the form after success
                setShowForm(false);
            } else {
                setErrors({ general: 'Wrong verification code' });
            }
        } catch (error) {
            console.error('Error during activation:', error);
            setErrors({ general: 'An error occurred while activating the account.' });
        } finally {
            setIsSubmitting(false); // Re-enable submit button
        }
    };

    return (
        <>  
            <span className='bg-img-v-2'>
                <section className="section-404">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-404">
                                    <h1>Activate Account</h1>
                                    <h3>Enter your verification code</h3>
                                    <p>Enter the verification code sent to your email to activate your account.</p>
                                    {errors.general && <p className="alert alert-danger">{errors.general}</p>}
                                    {successMessage && <p className="alert alert-success">{successMessage}</p>}
                                    
                                    {showForm && (
                                        <form onSubmit={handleSubmit} className="search-404">

                                            <input type="hidden" name="verification_code" value={formData.verification_code} />
                                            <input type="hidden" name="email" value={formData.email} />

                                            <input type="text" name="confirmation_code" placeholder="Enter Verification Code..." value={formData.confirmation_code} onChange={handleChange} required />

                                            {errors.confirmation_code && <p className="text-danger">{errors.confirmation_code}</p>}

                                            <br />
                                            <button type="submit" className="color-white" disabled={isSubmitting}>
                                                <i className="fa fa-sign-in"></i> {isSubmitting ? 'Authenticating ...' : 'Activate Account'}
                                            </button>
                                        </form>
                                    )}
                                    
                                    <a href="/signin" className="fs-11 color-orange"><i className="fa fa-sign-in"></i> Already have an account? Sign In</a>
                                    <br />
                                    <a href="/forgot" className="fs-11 color-orange"><i className="fa fa-question"></i> Forgot Account?</a>
                                    <br />
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