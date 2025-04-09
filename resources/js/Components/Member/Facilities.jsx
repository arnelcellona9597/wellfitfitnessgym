import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react"; 
import moment from "moment";
import DataTable from 'react-data-table-component';

export default function Facilities() {

    const {   get_all_inventory_items } = usePage().props;
    return (
       <>
  <section className="classes-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title"> 
            <span>FACILITIES & EQUIPMENT</span>
            <h2>Modern, Quality, and Brand-New</h2>
          </div>
        </div>
      </div>
      <div className="row">

      {get_all_inventory_items.map((item) => (
        <div className="col-lg-4 col-md-6">
          <div className="class-item">
            <div className="ci-pic">
            <img src={`/template/images/${item.inventory_image}`} alt="item" />

            </div>
            <div className="ci-text">
              <span>{item.inventory_name} - ({item.inventory_quantity} Quantity) </span>
              <h5>{item.inventory_description}</h5>
            </div>
          </div>
        </div>
      ))}

         
      </div>
    </div>
  </section>
       </>
    );
}