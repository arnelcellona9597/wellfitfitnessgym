import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
 
import DataTable from 'react-data-table-component';

const ListOfAllAccounts = () => {
    const {   all_users } = usePage().props;

    const [searchQuery, setSearchQuery] = useState(""); // Search state

    const columns = [

        {
        name: 'Profile',
        selector: row => (
            <img 
              src={row.profile ? `/template/images/${row.profile}` : '/template/member/img/Portrait_Placeholder.png'} 
              alt="No image" 
              style={{ width: '50px' }} 
            />
          ),
          
        sortable: true,
        },
        {
            name: 'Name',
            selector: row => `${row.first_name} ${row.last_name}`,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone ? `${row.phone}` : 'N/A', 
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => `${row.email}`,
            sortable: true,
        },
        
        {
        name: 'Option',
        cell: row => (
    
            <>
            <a
                href={`/admin/profile?id=${row.id}`}
            >
                View
            </a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteUser(row.id);
                }}
              >
                Delete
              </a>

            </>

        ),
        },
    ];


  const handleDeleteUser = async (ID) => {
 
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;
    try {
      const response = await fetch(`/admin/list-account/delete?id=${ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: ID }),
      });
      if (response.ok) {
        alert("Successfully deleted.");
        window.location.href = "/admin/list-account";
      } else {
        alert("Failed to delete membership.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };


  // Filter data based on search query
  const filteredData = all_users.filter(user => {
  
    const firstName = user.first_name.toLowerCase();
    // const profile = user.profile.toLowerCase();
    return (
        firstName.includes(searchQuery.toLowerCase()) 
        // profile.includes(searchQuery.toLowerCase())
    );
  });


 
  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">List Of Accounts</h5>
            <DataTable
              columns={columns}
              data={filteredData} 
              pagination
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%", margin: "0" }}
                />
              }
            /> 
          </div>
        </div>
      </div>
      
    
    </div>
  );
};

export default ListOfAllAccounts;
