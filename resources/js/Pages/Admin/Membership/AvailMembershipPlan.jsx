import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminAvailMembershipPlan from '@/Components/Admin/Membership/AvailMembershipPlan';

export default function adminAvailMembershipPlanPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Avail Membership Plan</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Avail Membership Plan</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminAvailMembershipPlan />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 