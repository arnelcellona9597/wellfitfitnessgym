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
                                    <form action="#" className="search-404">
                                        <input type="text" placeholder="Enter your First Name" />
                                        <input type="text" placeholder="Enter your Last Name" />
                                        <input type="email" placeholder="Enter your Email" />
                                        <input type="password" placeholder="Create a Password" />

                                        {/* <button type="submit"><i className="fa fa-signup"></i></button> */}
                                    </form>
                                    <a href="#" className="mb-3 fs-20 color-white"><i className="fa fa-plus"></i> Sign Up</a> <br/>
                                    <a href="/signin"  className="fs-11 color-orange mb-3"><i className="fa fa-sign-in "></i> Already have an account? Sign In</a><br/>
                                    <a href="/forgot"  className="fs-11 color-orange mb-3"><i className="fa fa-question "></i> Forgot Account?</a><br/>
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
