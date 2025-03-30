import React from 'react';

export default function AdminSidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <i className="bi bi-grid" />
                        <span>Dashboard</span>
                    </a>
                </li>
                
                <li className="nav-heading">Pages and Features</li>
                
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" href="#membership-nav">
                        <i className="bi bi-person-badge" />
                        <span>Membership</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </a>
                    <ul id="membership-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                        <li><a href="/admin/membership/avail-membership-plan"><i className="bi bi-circle" /><span>Avail Membership Plan</span></a></li>
                        <li><a href="/admin/membership/list-of-members"><i className="bi bi-circle" /><span>List of Members</span></a></li>
                        <li><a href="/admin/membership/add-plan"><i className="bi bi-circle" /><span>Add Membership Plan</span></a></li>
                        <li><a href="/admin/membership/list-of-membership-plan"><i className="bi bi-circle" /><span>List of Membership Plan</span></a></li>
                    </ul>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" href="#inventory-nav">
                        <i className="bi bi-box" />
                        <span>Inventory</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </a>
                    <ul id="inventory-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                        <li><a href="/admin/inventory/add-item"><i className="bi bi-circle" /><span>Add Item</span></a></li>
                        <li><a href="#"><i className="bi bi-circle" /><span>List of All Items</span></a></li>
                    </ul>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" href="#trainer-nav">
                        <i className="bi bi-person" />
                        <span>Booking for Trainer</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </a>
                    <ul id="trainer-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                        <li><a href="#"><i className="bi bi-circle" /><span>Add Trainer</span></a></li>
                        <li><a href="#"><i className="bi bi-circle" /><span>List of All Trainers</span></a></li>
                        <li><a href="#"><i className="bi bi-circle" /><span>List of All Booking</span></a></li>
                    </ul>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" href="#account-nav">
                        <i className="bi bi-person-circle" />
                        <span>Account</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </a>
                    <ul id="account-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                        <li><a href="#"><i className="bi bi-circle" /><span>Profile</span></a></li>
                        <li><a href="#"><i className="bi bi-circle" /><span>Add Customer</span></a></li>
                        <li><a href="#"><i className="bi bi-circle" /><span>List of Customers</span></a></li>
                    </ul>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" href="#gallery-nav">
                        <i className="bi bi-images" />
                        <span>Gallery</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </a>
                    <ul id="gallery-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                        <li><a href="#"><i className="bi bi-circle" /><span>Add Image</span></a></li>
                        <li><a href="#"><i className="bi bi-circle" /><span>List of All Images</span></a></li>
                    </ul>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="bi bi-star" />
                        <span>Reviews</span>
                    </a>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="bi bi-clock-history" />
                        <span>Logs (Recent Activity)</span>
                    </a>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="bi bi-box-arrow-right" />
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}
