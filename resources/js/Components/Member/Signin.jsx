import React, { useState } from 'react';

export default function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const response = await fetch('/signin', {
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
                setErrors({ general: 'Please verify your email before logging in.' });
            } else {
                // Successfully logged in
                setSuccessMessage('Successfully logged in! Redirecting to dashboard...');
                setFormData({
                    email: '',
                    password: ''
                });
                setShowForm(false);
    
          
                setTimeout(() => {
                    if ( result.type == "Administrator" ) {
                        window.location.href = '/admin/';
                    }
                    else {
                        window.location.href = '/member/';
                    }
                   
                }, 3000);


            }
        } catch (error) {
            console.error('Error during activation:', error);
            setErrors({ general: 'Wrong email or password!' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>  
            <span className='bg-img-v-1'>
                <section className="section-404">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-404">
                                    <h1>Sign In</h1>
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
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter password..."
                                                required
                                            />

                                            <br />
                                            <button type="submit" className="color-white" disabled={isSubmitting}>
                                                <i className="fa fa-sign-in"></i> {isSubmitting ? 'Authenticating ...' : 'Signin'}
                                            </button>
                                        </form>
                                    )}

                                    
                                    <a href="/signup"  className="fs-11 color-orange mb-3"><i className="fa fa-plus"></i> Don't have an account? Sign Up</a> <br/>
                                    <a href="/forgot"  className="fs-11 color-orange mb-3"><i className="fa fa-question"></i> Forgot Account?</a><br/>
                                    <a href="/"  className="fs-11 color-orange"><i className="fa fa-home"></i> Home Page </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </span>
            {/* End #main */}
            </>

    );
}