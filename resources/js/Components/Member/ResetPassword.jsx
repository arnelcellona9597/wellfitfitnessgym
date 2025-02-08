import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function ResetPassword() {

    const { email } = usePage().props;
    const [formData, setFormData] = useState({
        email: email || '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        setErrors({});
        setSuccessMessage('');
        setIsSubmitting(true);
    
        try {
            if (formData.password === formData.confirm_password) {
                const response = await fetch('/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                    },
                    body: JSON.stringify(formData)
                });
        
                // Check if the response is OK (status 200-299)
                if (!response.ok) {
                    const errorData = await response.json();
                    setErrors({ general: errorData.message || 'Wrong email or password!' });
                    return;
                }
        
                // If the response is OK, handle the result
                const result = await response.json();
                console.log(result);
        
                // Check if the email is verified
                if (result.email_verified_at === null) {
                    console.log("Email is not verified");
                    setErrors({ general: 'Account is not yet verified, Please check your email!' });
                } else {
                    // Successfully logged in
                    setSuccessMessage('You have successully changed password, Redirecting to login page...');
                    setFormData({
                        email: email || '',
                        password: '',
                        confirm_password: ''
                    });
                    setShowForm(false);
        
                    setTimeout(() => {
                        window.location.href = '/signin/';
                    }, 3000);
                }
            } else {
                setErrors({ general: 'Passwords did not match!' });
            }
            
        } catch (error) {
            console.error('Error during activation:', error);
            setErrors({ general: 'General Error!' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>  
            <span className='bg-img-v-3'>
                <section className="section-404">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-404">
                                    <h1>Password Reset</h1>
                                    <h3>Forgot your password?</h3>
                                    <p>If you didn’t request a password reset, you can safely ignore this email.</p>
                                    {errors.general && <p className="alert alert-danger">{errors.general}</p>}
                                    {successMessage && <p className="alert alert-success">{successMessage}</p>}
                                   
                                    {showForm && (
                                        <form onSubmit={handleSubmit} className="search-404">
                                            <input
                                                type="hidden"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter email..."
                                                required
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter password..."
                                                required
                                            />
                                            <input
                                                type="password"
                                                name="confirm_password"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                placeholder="Confirm password..."
                                                required
                                            />

                                            <br />
                                            <button type="submit" className="color-white" disabled={isSubmitting}>
                                                <i className="fa fa-plus"></i> {isSubmitting ? 'Authenticating ...' : 'Reset Password'}
                                            </button>
                                        </form>
                                    )}
                                
                                    <a href="/signup" className="fs-11 color-orange mb-3"><i className="fa fa-plus"></i> Don't have an account? Sign Up</a> <br/>
                                    <a href="/forgot" className="fs-11 color-orange mb-3"><i className="fa fa-question"></i> Forgot Account?</a><br/>
                                    <a href="/" className="fs-11 color-orange"><i className="fa fa-home"></i> Home Page </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </span>
        </>
    );
}
