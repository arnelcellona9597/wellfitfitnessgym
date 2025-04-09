import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminAddImage from '@/Components/Admin/Gallery/AddImage';

export default function adminAddGalleryPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Add Image</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Add Image</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminAddImage />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 