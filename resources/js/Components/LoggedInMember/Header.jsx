import React , {useEffect} from 'react';
import { usePage } from '@inertiajs/react';
import { useCookies } from 'react-cookie';

export default function Header() {

    const { url } = usePage(); // Get the current page URL

    const { cu_user_id, get_user_info } = usePage().props;
    
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
    
        // Cleanup on unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


      const navItemsDesktop = [
        { href: '/member/', label: 'Home' },
        { href: '/member/about', label: 'About' },
        { href: '/member/plans', label: 'Plans' },
        { href: '/member/trainor', label: 'Trainer' },
        { href: '/member/reviews', label: 'Reviews' },
        { href: '/member/contact', label: 'Contact' },
        ];

        const renderNavLinksDesktop = () =>
            navItemsDesktop.map((item) => (
                <li key={item.href} className={url === item.href ? 'activeNav' : ''}>
                    <a href={item.href}>{item.label}</a>
                </li>
        ));



      const navItemsDropdownDesktop = [
        { href: '/member/profile', label: 'Profile' },
        { href: '/member/account-history', label: 'Account History' },
        ];

        const renderNavLinksDropdownDesktop = () =>
            navItemsDropdownDesktop.map((item) => (
                <li key={item.href} className={url === item.href ? 'activeNav' : ''}>
                    <a href={item.href}>
                        <i className="fa fa-sign-in" /> &nbsp;{item.label}
                    </a>
                </li>
             
        ));



        const navItemsMobile= [
            { href: '/member/', label: 'Home' },
            { href: '/member/about', label: 'About' },
            { href: '/member/plans', label: 'Plans' },
            { href: '/member/trainor', label: 'Trainer' },
            { href: '/member/reviews', label: 'Reviews' },
            { href: '/member/contact', label: 'Contact' },
            { href: '/member/profile', label: 'Profile' },
            { href: '/member/account-history', label: 'Account History' },
            ];
    
            const renderNavLinksMobile = () =>
                navItemsMobile.map((item) => (
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
                        {/* <li>
                            <a href="/member/">Home  </a>
                        </li>
                        <li>
                            <a href="/member/about">About</a>
                        </li>
                        <li>
                            <a href="/member/plans">Plans</a>
                        </li>
                        <li>
                            <a href="/member/trainor">Trainer</a>
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
                        </a> */}
                        
                        {renderNavLinksMobile()}
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
                                {/*  <li>
                           <a href="/member/">Home </a>
                                </li>
                                <li>
                                    <a href="/member/about">About</a>
                                </li>
                                <li>
                                    <a href="/member/plans">Plans</a>
                                </li>
                                <li>
                                    <a href="/member/trainor">Trainer</a>
                                </li>
                                <li>
                                    <a href="/member/reviews">Reviews</a>
                                </li>
                                <li>
                                    <a href="/member/contact">Contact</a>
                                </li> */}

                                {renderNavLinksDesktop()}
                                    
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="top-option">
                                <div className="to-social profile-dropdown-label">
                                    <a href="#">
                                    <img 
                                        src={get_user_info?.profile 
                                            ? `/template/images/${get_user_info.profile}` 
                                            : "/template/member/img/Portrait_Placeholder.png"} 
                                        alt="profile" 
                                        className='userProfileImg'
                                    />

                                    </a>
                                    <br />
                                    <div className="profile-dropdown-content">
                                        {/* <a href="/member/profile">
                                            <i className="fa fa-sign-in" /> &nbsp;Profile
                                        </a>

                                        <a href="/member/account-history">
                                            <i className="fa fa-sign-in" /> &nbsp;Account History
                                        </a> */}


                                        {renderNavLinksDropdownDesktop()}

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
