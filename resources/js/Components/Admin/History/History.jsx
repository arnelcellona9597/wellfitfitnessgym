import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import DataTable from 'react-data-table-component';
import moment from "moment";

const ListOfAllActivityLog = () => {
    const {   get_logs } = usePage().props;

    const [searchQuery, setSearchQuery] = useState(""); // Search state
 

    const [editForm, setEditForm] = useState({
            logDescription: "",
            logDate: "",
            logId: ""
    });
    const [selectedToEditImageId, setSelectedToEditImageId] = useState(null);

    const columns = [
 

        { 
          name: 'Description',
          selector: row => row.first_name+" "+row.last_name+ " "+row.log_description,
          sortable: true,
          },
          { 
            name: 'Date',
            selector: row =>    moment(row.log_date).format("MMMM D, YYYY") ,
            sortable: true,
            },
        {
        name: 'Option',
        cell: row => (
    

            <>
                <a
                    href="#"
                    onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage(row.id);
                    }}
                >
                    Delete
                </a>
            </>
        ),
        },
    ];

  

  const handleDeleteImage = async (ImageId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this log?");
    if (!isConfirmed) return;
    try {
      const response = await fetch(`/admin/history/delete?id=${ImageId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: ImageId }), 
      });
      if (response.ok) {
        alert("Successfully deleted.");
        window.location.href = "/admin/history";
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

// Filter data based on search query
const filteredData = get_logs.filter(log => {
  const combinedDescription = `${log.first_name} ${log.last_name} ${log.log_description}`.toLowerCase();
  return combinedDescription.includes(searchQuery.toLowerCase());
});



  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">

            <h5 className="card-title">Activity History / Logs</h5>
            <DataTable
              columns={columns}
              pagination
              data={filteredData} 
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

export default ListOfAllActivityLog;
