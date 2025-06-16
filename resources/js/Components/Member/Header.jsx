import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Header() {

   
    return (
        <>
        <div className="offcanvas-menu-overlay" />
            <div className="offcanvas-menu-wrapper">
                <div className="canvas-close">
                <i className="fa fa-close" />
                </div>
                {/* <div className="canvas-search search-switch">
                <i className="fa fa-search" />
                </div> */}
                <nav className="canvas-menu mobile-menu">
                <ul>
                      <li>
                        <a href="/">Home</a>
                        </li>
                        <li>
                        <a href="/about">About</a>
                        </li>
                        <li>
                        <a href="/plans">Plans</a>
                        </li>
                        <li>
                        <a href="/trainor">Trainer</a>
                        </li>
                        <li>
                        <a href="/reviews">Reviews</a>
                        </li>
                        
                        <li>
                        <a href="/contact">Contact</a>
                        </li>
                </ul>
                </nav>
                <div id="mobile-menu-wrap" />
                <div className="to-social">
                        <a href="/signin">
                            <i className="fa fa-sign-in" />&nbsp;Sign In
                        </a> <br/>
                        <a href="/signup">
                            <i className="fa fa-plus" />&nbsp;Sign Up
                        </a>
                        {/* <a href="#">
                            <i className="fa fa-youtube-play" />
                        </a>
                        <a href="#">
                            <i className="fa fa-instagram" />
                        </a> */}
                        </div>
            </div>

            <header className="header-section">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                    <div className="logo">
                        <a href="/">
                        <img src="/template/member/img/logo.png" alt="" />
                        </a>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <nav className="nav-menu">
                    <ul>
                    <li>
                   
                        <a href="/">Home</a>
                        </li>
                        <li>
                        <a href="/about">About</a>
                        </li>
                        <li>
                        <a href="/plans">Plans</a>
                        </li>
                        <li>
                        <a href="/trainor">Trainer</a>
                        </li>
                        <li>
                        <a href="/reviews">Reviews</a>
                        </li>
                        
                        <li>
                        <a href="/contact">Contact</a>
                        </li>
                    </ul>
                    </nav>
                    </div>
                    <div className="col-lg-3">
                    <div className="top-option">
                        {/* <div className="to-search search-switch">
                        <i className="fa fa-search" />
                        </div> */}
                        <div className="to-social">
                        <a href="/signin">
                            <i className="fa fa-sign-in" />&nbsp;Sign In
                        </a> 
                        <a href="/signup">
                            <i className="fa fa-plus" />&nbsp;Sign Up</a>
    
                        </div>
                    </div>
                    </div>
                </div>
                <div className="canvas-open">
                    <i className="fa fa-bars" />
                </div>
                </div>
            </header>
        </>
    );
}