import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminListOfTrainers from '@/Components/Admin/BookTrainor/ListOfTrainers';

export default function adminListOfTrainers() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>List of all Trainers</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Proffessional Trainers</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminListOfTrainers />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 