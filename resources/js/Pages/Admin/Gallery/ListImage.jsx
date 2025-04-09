import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminListImage from '@/Components/Admin/Gallery/ListImage';

export default function adminListGalleryPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>List of Images</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">List of Images</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminListImage />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 