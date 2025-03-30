import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';


import ChartsReport from '@/Components/Admin/Charts/SalesReports';
import WebsiteTraffic from '@/Components/Admin/Charts/EquipmentReports';
import BudgetReport from '@/Components/Admin/Charts/PaymentMethod';
import CardsStatistics from '@/Components/Admin/CardsStatistics';


export default function adminIndexPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
   
  {/* ======= Sidebar ======= */}
  
  {/* End Sidebar*/}
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>
    {/* End Page Title */}
    <section className="section dashboard">
      <div className="row">
        {/* Left side columns */}
        <div className="col-lg-8">
          <div className="row">
            {/* Sales Card */}
            <CardsStatistics/>
            <ChartsReport />
          </div>
        </div>
 
        <div className="col-lg-4">
          <BudgetReport />
          <WebsiteTraffic />
        </div>
        
      </div>
    </section>
  </main>
  {/* End #main */}
  {/* ======= Footer ======= */}

  <AdminFooter />
  
 
</>

   );
} 