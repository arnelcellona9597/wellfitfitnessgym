import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react"; 

export default function AdminHeader() {
    const { get_user_info } = usePage().props;

    if ( !get_user_info ) {
      window.location = "/";
    }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/admin/" className="logo d-flex align-items-center">
          {/* <img src="/template/admin/assets/img/logo.png" alt="" /> */}
          <span className="d-none d-lg-block">WellFit Fitness Gym</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn" />
      </div>
      
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle" href="#">
              <i className="bi bi-search" />
            </a>
          </li>
          
          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src={`/template/images/${get_user_info.profile}`} alt="Profile" className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">{get_user_info.first_name} {get_user_info.last_name}</span>
            </a>
            
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{get_user_info.email}</h6>
                <span>Administrator</span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
              <a 
                className="dropdown-item d-flex align-items-center" 
                href={`/admin/profile?id=${get_user_info.id}`}
              >

                  <i className="bi bi-person" />
                  <span>My Profile</span>
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="/signin/">
                  <i className="bi bi-box-arrow-right" />
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
