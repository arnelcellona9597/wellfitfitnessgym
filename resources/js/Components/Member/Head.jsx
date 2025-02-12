import React from 'react';
import { Helmet } from 'react-helmet';

const MemberHead = () => {
    return (
        <Helmet>

            <link rel="icon" type="image/png" href="/template/member/img/logo.png"/>
            <title>Wellfit Fitness Gym</title>

            {/* Fonts */}
            <link 
                href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&display=swap" 
                rel="stylesheet" 
            />
            <link 
                href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap" 
                rel="stylesheet" 
            />

            {/* CSS */}
            <link rel="stylesheet" href="/template/member/css/bootstrap.min.css" type="text/css" />
            <link rel="stylesheet" href="/template/member/css/font-awesome.min.css" type="text/css" />
            <link rel="stylesheet" href="/template/member/css/flaticon.css" type="text/css" />
            <link rel="stylesheet" href="/template/member/css/owl.carousel.min.css" type="text/css" />
            <link rel="stylesheet" href="/template/member/css/barfiller.css" type="text/css" />
            {/* <link rel="stylesheet" href="/template/member/css/magnific-popup.css" type="text/css" /> */}
            <link rel="stylesheet" href="/template/member/css/slicknav.min.css" type="text/css" />
            <link rel="stylesheet" href="/template/member/css/style.css" type="text/css" />

            {/* JavaScript */}
            {/* <script src="/template/member/js/jquery-3.3.1.min.js" ></script>  
            <script src="/template/member/js/bootstrap.min.js" defer></script>  
            <script src="/template/member/js/jquery.magnific-popup.min.js" defer></script>
            <script src="/template/member/js/owl.carousel.min.js" defer></script>
            <script src="/template/member/js/masonry.pkgd.min.js" defer></script>
            <script src="/template/member/js/jquery.barfiller.js" defer></script> 
            <script src="/template/member/js/jquery.slicknav.js" defer></script> 
            <script src="/template/member/js/main.js" defer ></script>  */}

            <script src="/template/member/js/js.js" defer ></script> 
        </Helmet>
    );
};

export default MemberHead;
