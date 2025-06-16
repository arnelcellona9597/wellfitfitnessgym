import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminAddBooking from '@/Components/Admin/BookTrainor/AddBooking';

export default function adminAddBooking() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Add Booking for Trainers</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Add Booking for Trainer</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminAddBooking />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 