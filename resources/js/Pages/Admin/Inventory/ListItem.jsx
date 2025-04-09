import React from 'react';


import AdminHead from '@/Components/Admin/Head';
import AdminHeader from '@/Components/Admin/Header';
import AdminSidebar from '@/Components/Admin/Sidebar';
import AdminFooter from '@/Components/Admin/Footer';
import AdminListItem from '@/Components/Admin/Inventory/ListItem';

export default function adminListItemPage() {
    return (
      <>
      <AdminHead />
      <AdminHeader />
      <AdminSidebar />
  
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>List of Item</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">List of Items in Inventory</li>
        </ol>
      </nav>
    </div>
   
    <section className="section dashboard">

      <AdminListItem />

    </section>

  </main>
 

  <AdminFooter />
  
 
</>

   );
} 