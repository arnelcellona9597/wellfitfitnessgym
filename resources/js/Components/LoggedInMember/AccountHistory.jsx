import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function MemberAccountHistory() {
    const { get_user_membership } = usePage().props;
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter membership plans based on search query
    const filteredMembership = get_user_membership.filter(plan =>
        plan.plan_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic based on the filtered membership plans
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlans = filteredMembership.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMembership.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle cancel membership
    const [cancelMembershipId, setCancelMembershipId] = useState(null);
    const [deleteMembershipId, setDeleteMembershipId] = useState(null);
  

    const handleCancelMembership = async (planId) => {
        setCancelMembershipId(planId); // Store the ID of the plan being canceled

        try {
            const response = await fetch(`/member/account-history/member-plan-cancel?id=${planId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: JSON.stringify({
                    plan_id: planId
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Membership has been successfully cancelled.");
                window.location.href = "/member/account-history";
                // Handle UI update if needed
            } else {
                // alert("Failed to cancel membership: " + result.message);
            }
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

    const handleDeleteMembership = async (planId) => {
        setDeleteMembershipId(planId); // Store the ID of the plan being canceled

        try {
            const response = await fetch(`/member/account-history/member-plan-delete?id=${planId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: JSON.stringify({
                    plan_id: planId
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Membership has been successfully deleted.");
                window.location.href = "/member/account-history";
                // Handle UI update if needed
            } else {
                // alert("Failed to cancel membership: " + result.message);
            }
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

    
   

    return (
        <section className="gym-section">
            <div className="section-title">
                <span>Account History</span>
                <h2>The data below shows your previous membership plans and class booking history.</h2>
            </div>
            <div className="gym-container">
                <div className="gym-column">
                    <div className="Theader">
                        <h2>Gym Membership Plan</h2>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // reset to page 1 on search
                            }}
                        />
                    </div>


                    <table className="gym-table">
                        <thead>
                            <tr>
                                <th>Plan</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPlans.map((plan) => (
                                <tr key={plan.id}>
                                    <td>{plan.plan_name}</td>
                                    <td>₱{parseInt(plan.plan_price).toLocaleString()}</td>
                                    <td>{plan.status}</td>
                                    <td>

                                        {plan.status === "Pending" && (
                                            <a 
                                                className="cancelMembership" 
                                                href="#" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    handleCancelMembership(plan.id); 
                                                }}
                                            >
                                                Cancel
                                            </a>
                                        )}

                                        {plan.status === "Cancelled" && (
                                            <a 
                                                className="deleteMembership" 
                                                href="#" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    handleDeleteMembership(plan.id); 
                                                }}
                                            >
                                                Delete
                                            </a>
                                        )}


                                        <a href={`/member/account-history/membership?id=${plan.id}`}> View </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="gym-column">
                    <h2>Booking for Gym Class</h2>
                    <table className="gym-table">
                        <thead>
                            <tr>
                                <th>Trainor</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>
                                    <a href=""> Cancel </a>
                                    <a href=""> View </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
