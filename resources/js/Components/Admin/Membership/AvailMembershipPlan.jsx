import React, { useState } from "react";
import { usePage } from "@inertiajs/react"; 

const AvailMembershipPlan = () => {

    const { all_users, get_all_plans } = usePage().props;

    // States to hold selected user_id and plan_id
    const [userId, setUserId] = useState("");
    const [planId, setPlanId] = useState("");

    const handleAvailMembershipPlan = async () => { 
      if (userId === "" || planId === "") {
        alert("Please fill the form before submitting.");
        return;
      }
    
      const selectedPlan = get_all_plans.find(plan => plan.id == planId);
    
      if (!selectedPlan) {
        alert("Selected plan not found.");
        return;
      }
    
      const { duration, price, plan_name, plan_description } = selectedPlan;
    
      // Date logic
      const today = new Date();
      const start_date = today.toISOString().split("T")[0];
    
      const endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + parseInt(duration));
      const end_date = endDate.toISOString().split("T")[0];
    
      try {
        const response = await fetch('/over-the-counter-payment', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
          },
          body: JSON.stringify({
            user_id: userId,
            plan_id: planId,
            plan_duration: duration,
            plan_price: price,
            plan_name: plan_name,
            plan_description: plan_description,
            start_date: start_date,
            end_date: end_date,
            payment_method: "Over The Counter",
            status: "Approved",
          }),
        });
    
        if (!response.ok) {
          const result = await response.json();
          setErrors({ general: result.message || "Error submitting!" });
          return;
        } else {
          alert("Membership has been successfully availed.");
          window.location.href = "/admin/membership/list-of-members/";
        }
      } catch (error) {
        console.error("Error submitting:", error);
        setErrors({ general: "Something went wrong. Please try again!" });
        return;
      }
    };
    
    

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Select a member account to join the WellFit Fitness plan.</h5>
          <form>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select an Account:</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="user_id"
                  value={userId} // Binding value to userId state
                  onChange={(e) => setUserId(e.target.value)} // Update userId state
                >
                  <option    >Select an Account</option>
                  { 
                    all_users.map((user) => ( 
                      <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select Membership Plan:</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="plan_id"
                  value={planId} // Binding value to planId state
                  onChange={(e) => setPlanId(e.target.value)} // Update planId state
                >
                  <option  >Select Membership Plan</option>
                  { 
                    get_all_plans.map((plan) => ( 
                      <option key={plan.id} value={plan.id}>{plan.plan_name}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAvailMembershipPlan();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
};

export default AvailMembershipPlan;
