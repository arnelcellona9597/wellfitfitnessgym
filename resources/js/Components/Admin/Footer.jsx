import React from 'react';
 
export default function adminFooter() {
    return (
        <>
        <footer id="footer" className="footer">
            <div className="copyright">
            © Copyright 
            <strong>
                <span> Wellness Fit Gym</span>
            </strong>
            . All Rights Reserved
            </div>
            <div className="credits">
 
            Developed by <a href="https://www.facebook.com/lesteraidan" target='_blank'>Lester Aidan & Priscilla Presente</a>
            </div>
        </footer>
        {/* End Footer */}
        <a
            href="#"
            className="back-to-top d-flex align-items-center justify-content-center"
        >
            <i className="bi bi-arrow-up-short" />
        </a>
        </>
    );
} 