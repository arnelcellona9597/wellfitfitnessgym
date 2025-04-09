import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminAddAccount from '@/Components/Admin/Profile/AddAccount';

export default function adminAddCustomerAccountPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Sign-up</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Create an Account for Customer</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminAddAccount />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 