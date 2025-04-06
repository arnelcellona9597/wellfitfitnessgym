import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function MemberAccountHistory() {
    const { get_user_membership, get_user_booktrainor } = usePage().props;
    
    const [currentPageMembership, setCurrentPageMembership] = useState(1);
    const [currentPageTrainor, setCurrentPageTrainor] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchMembership, setSearchMembership] = useState("");
    const [searchTrainor, setSearchTrainor] = useState("");
    const [cancelMembershipId, setCancelMembershipId] = useState(null);
    const [deleteMembershipId, setDeleteMembershipId] = useState(null);

    const [cancelBookTrainorId, setCancelBookTrainorId] = useState(null);
    const [deleteBookTrainorId, setDeleteBookTrainorId] = useState(null);


    // Filter membership plans based on search query
    const filteredMembership = get_user_membership.filter(plan =>
        plan.plan_name.toLowerCase().includes(searchMembership.toLowerCase())
    );

    // Filter trainer bookings based on search query
    const filteredTrainor = get_user_booktrainor.filter(bookTrainor =>
        bookTrainor.trainer_name.toLowerCase().includes(searchTrainor.toLowerCase())
    );

    // Pagination logic for membership plans
    const indexOfLastMembership = currentPageMembership * itemsPerPage;
    const indexOfFirstMembership = indexOfLastMembership - itemsPerPage;
    const currentPlans = filteredMembership.slice(indexOfFirstMembership, indexOfLastMembership);
    const totalPagesMembership = Math.ceil(filteredMembership.length / itemsPerPage);

    // Pagination logic for trainer bookings
    const indexOfLastTrainor = currentPageTrainor * itemsPerPage;
    const indexOfFirstTrainor = indexOfLastTrainor - itemsPerPage;
    const currentTrainors = filteredTrainor.slice(indexOfFirstTrainor, indexOfLastTrainor);
    const totalPagesTrainor = Math.ceil(filteredTrainor.length / itemsPerPage);

    const paginateMembership = (pageNumber) => setCurrentPageMembership(pageNumber);
    const paginateTrainor = (pageNumber) => setCurrentPageTrainor(pageNumber);


    

    const handleCancelBookTrainor = async (bookTrainorId) => {
        setCancelBookTrainorId(bookTrainorId);
        try {
            const response = await fetch(`/member/account-history/member-booktrainor-cancel?id=${bookTrainorId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: JSON.stringify({ id: bookTrainorId }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Successfully cancelled.");
                window.location.href = "/member/account-history";
            }
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

     
    const handleDeleteBookTrainor = async (id) => {
        setDeleteBookTrainorId(id);
        try {
            const response = await fetch(`/member/account-history/member-booktrainor-delete?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: JSON.stringify({ id: id }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("successfully deleted.");
                window.location.href = "/member/account-history";
            }
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };


    const handleCancelMembership = async (planId) => {
        setCancelMembershipId(planId);
        try {
            const response = await fetch(`/member/account-history/member-plan-cancel?id=${planId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: JSON.stringify({ plan_id: planId }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Successfully cancelled.");
                window.location.href = "/member/account-history";
            }
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

    const handleMemberPlanDelete = async (planId) => {
        setCancelMembershipId(planId);
        try {
            const response = await fetch(`/member/account-history/member-plan-delete?id=${planId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: JSON.stringify({ plan_id: planId }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Membership has been successfully deleted.");
                window.location.href = "/member/account-history";
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
                            value={searchMembership}
                            onChange={(e) => {
                                setSearchMembership(e.target.value);
                                setCurrentPageMembership(1);
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
                                                className="MemberPlanDelete" 
                                                href="#" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    handleMemberPlanDelete(plan.id); 
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
                    <div className="pagination">
                        {Array.from({ length: totalPagesMembership }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginateMembership(i + 1)}
                                className={currentPageMembership === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="gym-column">
                    <div className="Theader">
                        <h2>Booking for Gym Trainer</h2>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTrainor}
                            onChange={(e) => {
                                setSearchTrainor(e.target.value);
                                setCurrentPageTrainor(1);
                            }}
                        />
                    </div>

                    <table className="gym-table">
                        <thead>
                            <tr>
                                <th>Trainer</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTrainors.map((bookTrainor) => (
                                <tr key={bookTrainor.id}>
                                    <td>{bookTrainor.trainer_name}</td>
                                    <td>₱{parseInt(bookTrainor.trainer_total_price).toLocaleString()}</td>
                                    <td>{bookTrainor.trainer_status}</td>
                                    <td>

                                    

                                        {bookTrainor.trainer_status == "Pending" && (
                                            <a 
                                                className="cancelBookTrainor" 
                                                href="#" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    handleCancelBookTrainor(bookTrainor.id); 
                                                }}
                                            >
                                                Cancel
                                            </a>
                                        )}


                                        {bookTrainor.trainer_status == "Cancelled" && (
                                            <a 
                                                className="deleteBookTrainor" 
                                                href="#" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    handleDeleteBookTrainor(bookTrainor.id); 
                                                }}
                                            >
                                                Delete
                                            </a>
                                        )}

                                        <a href={`/member/account-history/trainor?id=${bookTrainor.id}`}> View </a>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: totalPagesTrainor }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginateTrainor(i + 1)}
                                className={currentPageTrainor === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
