import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminBookingsList from '@/Components/Admin/BookTrainor/BookingsList';

export default function adminBookingsList() {
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

      <AdminBookingsList />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 