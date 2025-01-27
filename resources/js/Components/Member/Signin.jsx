import React from 'react';

export default function Signin() {
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
                                    <form action="#" className="search-404">
                                        <input type="email" placeholder="Enter your Email" />
                                        <input type="password" placeholder="Enter your Password" />

                                        {/* <button type="submit"><i className="fa fa-signin"></i></button> */}
                                    </form>
                                    <a href="./index.html" className="mb-3 fs-20 color-white"><i className="fa fa-sign-in "></i> Sign In</a> <br/>
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