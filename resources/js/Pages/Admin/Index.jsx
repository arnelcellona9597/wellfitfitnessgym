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


        <div className='card-body'>
        
        <div className='card'>
          <div className='card-body'>
          <form action="/admin/" method="get">
              <h2 className='card-title'>Filter By Date:</h2>
              <div className="row mb-3">
                <label htmlFor="start_date" className="col-sm-3 col-form-label">Start Date</label>
                <div className="col-sm-9 mb-2">
                  <input type="date" className='form-control' name="start_date" required/>
                </div>

                <label htmlFor="end_date" className="col-sm-3 col-form-label ">End Date</label>
                <div className="col-sm-9">
                <input type="date" className='form-control' name="end_date" required/>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
          </div>
       
        </div>


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