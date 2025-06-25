import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import DataTable from 'react-data-table-component';

const ListOfAllReviews = () => {
  const {  reviews } = usePage().props;

  const [searchQuery, setSearchQuery] = useState(""); // Search state

  const columns = [
    {
      name: 'Name',
      selector: row => `${row.first_name} ${row.last_name}`, 
      sortable: true,
    },
    {
      name: 'Image',
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
      name: 'Date',
      selector: row => row.created_at ? moment(row.created_at).format("MMMM D, YYYY") : "N/A",
      sortable: true,
    },
    {
        name: 'Rating',
        selector: row => (
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} style={{ color: i < row.rate ? '#FFD700' : '#ccc' }}>
                ★
              </span>
            ))}
          </div>
        ),
        sortable: true,
      },

      {
        name: 'Comments',
        selector: row => row.comment,
        cell: row => (
          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: '300px' }}>
            {row.comment}
          </div>
        ),
        sortable: false,
        grow: 2, // Optional: Makes the column wider
      },
      
    {
      name: 'Option',
      cell: row => (
        <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleDeleteMembershipPlan(row.id);
        }}
      >
        Delete
      </a>
      ),
    },
  ];



  const handleDeleteMembershipPlan = async (reviewshipId) => {
    console.log("Delete reviewship with ID:", reviewshipId);

    const isConfirmed = window.confirm("Are you sure you want to delete this review?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/admin/reviews/reviews/delete?id=${reviewshipId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: reviewshipId }),
      });

      if (response.ok) {
        alert("Successfully deleted.");
        window.location.href = "/admin/reviews";
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };


  // Filter data based on search query
  const filteredData = reviews.filter(review => {
    const fullName = `${review.first_name} ${review.last_name}`.toLowerCase();
 
    return (
      fullName.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">List Of Reviews</h5>
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

export default ListOfAllReviews;
