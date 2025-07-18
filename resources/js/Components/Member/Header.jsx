import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function Header() {
    const { url } = usePage(); // Get the current page URL

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header-section');
            if (!header) return;

            if (window.scrollY > 0) {
                header.classList.add('custom-sticky-header');
            } else {
                header.classList.remove('custom-sticky-header');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/plans', label: 'Plans' },
        { href: '/trainor', label: 'Trainer' },
        { href: '/reviews', label: 'Reviews' },
        { href: '/contact', label: 'Contact' },
    ];

    const renderNavLinks = () =>
        navItems.map((item) => (
            <li key={item.href} className={url === item.href ? 'activeNav' : ''}>
                <a href={item.href}>{item.label}</a>
            </li>
        ));

    return (
        <>
            <div className="offcanvas-menu-overlay" />
            <div className="offcanvas-menu-wrapper">
                <div className="canvas-close">
                    <i className="fa fa-close" />
                </div>
                <nav className="canvas-menu mobile-menu">
                    <ul>
                        {renderNavLinks()}
                    </ul>
                </nav>
                <div id="mobile-menu-wrap" />
                <div className="to-social">
                    <a href="/signin">
                        <i className="fa fa-sign-in" />&nbsp;Sign In
                    </a>
                    <br />
                    <a href="/signup">
                        <i className="fa fa-plus" />&nbsp;Sign Up
                    </a>
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
                                    {renderNavLinks()}
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="top-option">
                                <div className="to-social">
                                    <a href="/signin">
                                        <i className="fa fa-sign-in" />&nbsp;Sign In
                                    </a>
                                    <a href="/signup">
                                        <i className="fa fa-plus" />&nbsp;Sign Up
                                    </a>
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
