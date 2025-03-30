import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminListOfMembers from '@/Components/Admin/Membership/ListOfMembers';

export default function adminAvailMembershipPlanPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>List of Members</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">List of Members</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminListOfMembers />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 