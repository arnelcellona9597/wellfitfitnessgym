import React from 'react';

export default function Footer() {
    return (
        <>


<div className="search-model">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="search-close-switch">+</div>
      <form className="search-model-form">
        <input type="text" id="search-input" placeholder="Search here....." />
      </form>
    </div>
  </div>

<section className="footer-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="fs-about">
            <div className="fa-logo">
              <a href="/">
                <img src="/template/member/img/logo.png" alt="" />
              </a>
            </div>
            <p>
            Wellness Fit Gym is dedicated to helping you achieve your fitness goals with expert guidance. Join us today and start your journey to better health.
            </p>
            <div className="fa-social">
              <a href="#">
                <i className="fa fa-facebook" />
              </a>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
              <a href="#">
                <i className="fa fa-youtube-play" />
              </a>
              <a href="#">
                <i className="fa fa-instagram" />
              </a>
              <a href="#">
                <i className="fa  fa-envelope-o" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-6">
          <div className="fs-widget">
            <h4>Useful links</h4>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/trainor">Book Trainor</a>
              </li>
              <li>
                <a href="/reviews">Customer Reviews</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-6">
          <div className="fs-widget">
            <h4>Membership</h4>
            <ul>
              <li>
                <a href="/plans">Starter Fit Plan</a>
              </li>
              <li>
                <a href="/plans">Flex Pro Plan</a>
              </li>
              <li>
                <a href="/plans">Commit to Fit Plan</a>
              </li>
              <li>
                <a href="/plans">Ultimate Fit Plan</a>
              </li>
            </ul>

          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="fs-widget">
            <h4>Customer Reviews</h4>
            <div className="fw-recent">
              <h6>
                <a href="/reviews">
                  Physical fitness may help prevent depression, anxiety
                </a>
              </h6>
              <ul>
                <li>John Doe</li>
                <li>January 8, 2024</li>
                <li>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </li>
              </ul>
            </div>
            <div className="fw-recent">
              <h6>
              <a href="/reviews">
                  Fitness: The best exercise to lose belly fat and tone up...
                </a>
              </h6>
              <ul>
                <li>Michelle Wills</li>
                <li>Fenruary 18, 2022</li>
                <li>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="copyright-text">
            <p>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved | Developed by &nbsp;
              <a href="https://www.facebook.com/lesteraidan" target="_blank">
                Lester Aidan & Priscilla Presente
              </a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
    );
}
