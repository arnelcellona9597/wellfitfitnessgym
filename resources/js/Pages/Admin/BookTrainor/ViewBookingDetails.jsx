import React from 'react';

import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminViewBookingDetails from '@/Components/Admin/BookTrainor/ViewBookingDetails';

export default function AdminViewBookingDetailsPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Bookings List</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">List of all Bookings</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">
      <AdminViewBookingDetails />
    </section>

  </main>

  <AdminFooter />
</>

   );
} 