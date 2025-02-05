import React, { useState } from 'react';

export default function Signup() {

    const generateVerificationCode = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    };

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        type: 'Member',
        verification_code: generateVerificationCode()
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
        setIsSubmitting(true); // ✅ Disable submit button

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log("response: "+response); 
            console.log("result: "+result); 

            setSuccessMessage('Check your email to activate your account...');
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                type: 'Member'
            });

            // ✅ Hide form and show success message
            setShowForm(false);


        } 
        catch (error) {
            setErrors({ general: 'Email already exist, Try to create new one.' });
            // console.log("error: "+error); 
        }  
        finally {
            setIsSubmitting(false); // ✅ Re-enable submit button
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
                                    <h1>Sign Up</h1>
                                    <h3>Create Your Fitness Account Today</h3>
                                    <p>Sign up now to start your fitness journey, access personalized plans, and unlock exclusive member benefits.</p>

                                    {errors.general && <p className="alert alert-danger">{errors.general}</p>}
                                    {successMessage && <p className="alert alert-success">{successMessage}</p>}
                                    
                                    {showForm && (
                                        <form onSubmit={handleSubmit} className="search-404">


                                            <input type="hidden" name="type" value={formData.type} />
                                            <input type="hidden" name="type" value={formData.verification_code} />



                                            <input type="text" name="first_name" placeholder="Enter your First Name" value={formData.first_name} onChange={handleChange} required />
                                            {errors.first_name && <p className="text-danger">{errors.first_name}</p>}

                                            <input type="text" name="last_name" placeholder="Enter your Last Name" value={formData.last_name} onChange={handleChange} required />
                                            {errors.last_name && <p className="text-danger">{errors.last_name}</p>}

                                            <input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
                                            {errors.email && <p className="text-danger">{errors.email}</p>}

                                            <input type="password" name="password" placeholder="Create a Password" value={formData.password} onChange={handleChange} required />
                                            {errors.password && <p className="text-danger">{errors.password}</p>}

                                            <br />
                                            <button type="submit" className="color-white" disabled={isSubmitting}>
                                                <i className="fa fa-plus"></i> {isSubmitting ? 'Signing Up...' : 'Sign Up'}
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
