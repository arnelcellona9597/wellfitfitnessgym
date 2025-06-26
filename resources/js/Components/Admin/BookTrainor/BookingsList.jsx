import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import DataTable from 'react-data-table-component';

const ListOfBookings = () => {
  const {  get_all_user_booktrainor } = usePage().props;

  const [searchQuery, setSearchQuery] = useState(""); // Search state

  const columns = [
    {
      name: 'Member Name',
      selector: row => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: 'Trainer Name',
      selector: row => row.trainer_name,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: row => row.trainer_start_date ? moment(row.trainer_start_date).format("MMMM D, YYYY") : "N/A",
      sortable: true,
    },
    {
      name: 'End Date',
      selector: row => row.trainer_end_date ? moment(row.trainer_end_date).format("MMMM D, YYYY") : "N/A",
      sortable: true,
    },
    {
      name: 'Time Schedule',
      selector: row => row.trainer_time_schedule,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.trainer_status,
      sortable: true,
    },
    {
      name: 'Option',
      cell: row => (
        <>

        <a href={`/admin/book-trainer/view-booking-details/?id=${row.id}`}>
          View
        </a>

        {
          row.trainer_status === "Pending" ? (
            <>
            &nbsp;|&nbsp;
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleApproveMembershipPlan(row.id);
                }}
              >
                Approve
              </a>
              &nbsp;|&nbsp; 
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancelMembershipPlan(row.id);
                }}
              >
                Cancel
              </a>
            </>
          ) : null
        }
        {
          row.trainer_status === "Cancelled" ? (
            <>
            &nbsp;|&nbsp;
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteMembershipPlan(row.id);
                }}
              >
                Delete
              </a>
            </>
          ) : null
        }


        </>
      ),
    },
  ];

  // Async function for handling membership cancellation
  const handleCancelMembershipPlan = async (membershipId) => {
    console.log("Cancelling membership with ID:", membershipId);

    const isConfirmed = window.confirm("Are you sure you want to cancel this membership?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/member/account-history/member-booktrainor-cancel?id=${membershipId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: membershipId }),
      });

      if (response.ok) {
        alert("Successfully canceled.");
        window.location.href = "/admin/book-trainer/booking-list/";
      } else {
        alert("Failed to cancel membership.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    } 
  };

  const handleApproveMembershipPlan = async (membershipId) => {
    console.log("Approve membership with ID:", membershipId);

    const isConfirmed = window.confirm("Are you sure you want to approve this membership?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/admin/book-trainer/booking-list/approve?id=${membershipId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: membershipId }),
      });

      if (response.ok) {
        alert("Successfully approved.");
        window.location.href = "/admin/book-trainer/booking-list/";
      } else {
        alert("Failed to approve membership.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const handleDeleteMembershipPlan = async (membershipId) => {
    console.log("Delete membership with ID:", membershipId);

    const isConfirmed = window.confirm("Are you sure you want to delete this membership?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/member/account-history/member-booktrainor-delete?id=${membershipId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: membershipId }),
      });

      if (response.ok) {
        alert("Successfully deleted.");
        window.location.href = "/admin/book-trainer/booking-list/";
      } else {
        alert("Failed to delete membership.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };


  // Filter data based on search query
  const filteredData = get_all_user_booktrainor.filter(booking => {
    const fullName = `${booking.first_name} ${booking.last_name}`.toLowerCase();
    const trainorName = booking.trainer_name.toLowerCase();
    const trainerStatus = booking.trainer_status.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      trainorName.includes(searchQuery.toLowerCase()) ||
      trainerStatus.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">List Of All Bookings</h5>
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

export default ListOfBookings;
