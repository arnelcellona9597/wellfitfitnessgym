import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminHistory from '@/Components/Admin/History/History';

export default function adminHistoryPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>History</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Activity logs</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminHistory />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 