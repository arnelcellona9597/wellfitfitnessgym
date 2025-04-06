import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminAddTrainor from '@/Components/Admin/BookTrainor/AddTrainor';

export default function adminAddTrainor() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Add Trainor</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Add Trainor</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminAddTrainor />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 