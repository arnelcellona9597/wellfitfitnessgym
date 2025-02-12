import React from 'react';
import { usePage } from '@inertiajs/react';
import { useCookies } from 'react-cookie';

export default function Header() {
    const { cu_user_id } = usePage().props;


    const [cookies, setCookie, removeCookie] = useCookies(['cu_user_id']);

    const handleLogout = () => {
      // Remove the 'cu_user_id' cookie
      removeCookie('cu_user_id', { path: '/' });
      window.location.href = '/signin/';
    };

    // Redirect to signin if no cu_user_id
    if (!cu_user_id) {
        window.location.href = '/signin/';
    }

    return (
        <>
            <div className="offcanvas-menu-overlay" />
            <div className="offcanvas-menu-wrapper">
                <div className="canvas-close">
                    <i className="fa fa-close" />
                </div>

                <nav className="canvas-menu mobile-menu">
                    <ul>
                        <li>
                            <a href="/member/">Home</a>
                        </li>
                        <li>
                            <a href="/member/about">About</a>
                        </li>
                        <li>
                            <a href="/member/plans">Plans</a>
                        </li>
                        <li>
                            <a href="/member/trainor">Trainor</a>
                        </li>
                        <li>
                            <a href="/member/reviews">Reviews</a>
                        </li>
                        <li>
                            <a href="/member/contact">Contact</a>
                        </li>
                        <li>
                            <a href="/member/profile">Profile</a>
                        </li>
                        <a href="/member/account-history">
                                            <i className="fa fa-sign-in" /> &nbsp;Account History
                                        </a>
                        <li>
                            <a href="#"  className='logout'  onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap" />
            </div>

            <header className="header-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="logo">
                                <a href="/member/">
                                    <img src="/template/member/img/logo.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="nav-menu">
                                <ul>
                                <li>
                            <a href="/member/">Home</a>
                                </li>
                                <li>
                                    <a href="/member/about">About</a>
                                </li>
                                <li>
                                    <a href="/member/plans">Plans</a>
                                </li>
                                <li>
                                    <a href="/member/trainor">Trainor</a>
                                </li>
                                <li>
                                    <a href="/member/reviews">Reviews</a>
                                </li>
                                <li>
                                    <a href="/member/contact">Contact</a>
                                </li>
    
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="top-option">
                                <div className="to-social profile-dropdown-label">
                                    <a href="#">
                                        <i className="fa fa-sign-in" /> &nbsp; USER EMAIL ...
                                    </a>
                                    <br />
                                    <div className="profile-dropdown-content">
                                        <a href="/member/profile">
                                            <i className="fa fa-sign-in" /> &nbsp;Profile
                                        </a>

                                        <a href="/member/account-history">
                                            <i className="fa fa-sign-in" /> &nbsp;Account History
                                        </a>
                                        <a href="#"  className='logout'  onClick={handleLogout}> 
                                            <i className="fa fa-sign-in" /> &nbsp;Logout
                                        </a>
                                    </div>
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
