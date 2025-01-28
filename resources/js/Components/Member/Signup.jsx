import React from 'react';

export default function Signup() {
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
                                    <form action="/signup" method="POST" className="search-404">
                                        {/* CSRF token (necessary for Laravel backend) */}
                                        <input
                                            type="hidden"
                                            name="_token"
                                            value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')}
                                        />
                                        <input type="text" name="first_name" placeholder="Enter your First Name" required />
                                        <input type="text" name="last_name" placeholder="Enter your Last Name" required />
                                        <input type="email" name="email" placeholder="Enter your Email" required />
                                        <input type="password" name="password" placeholder="Create a Password" required />
                                        <br />
                                        <button className="color-white">
                                            <i className="fa fa-plus"></i> Sign Up
                                        </button>
                                    </form>
                                    <a href="/signin" className="fs-11 color-orange">
                                        <i className="fa fa-sign-in"></i> Already have an account? Sign In
                                    </a>
                                    <br />
                                    <a href="/forgot" className="fs-11 color-orange">
                                        <i className="fa fa-question"></i> Forgot Account?
                                    </a>
                                    <br />
                                    <a href="/" className="fs-11 color-orange">
                                        <i className="fa fa-home"></i> Home Page
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </span>
        </>
    );
}
