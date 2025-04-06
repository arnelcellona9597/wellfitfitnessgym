import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

const ListOfMembershipPlan = () => {
  const { get_all_plans, id } = usePage().props;

  const [deletePlanId, setDeletePlanId] = useState(null);
  const [selectedToEditPlanId, setSelectedToEditPlanId] = useState(null);
  const [editPlanId, setEditPlanId] = useState(null);

  const [editForm, setEditForm] = useState({
    planName: "",
    description: "",
    price: "",
    duration: ""
  });
  
  const handleEditPlan = async (e) => {
    e.preventDefault(); // this is the actual event object
    
    if (!selectedToEditPlanId) {
      alert("No plan selected to edit.");
      return;
    }
  
    try {
      const response = await fetch(`/admin/membership/list-of-membership-plan/edit?id=${selectedToEditPlanId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({
          plan_name: editForm.planName,
          plan_description: editForm.description,
          price: editForm.price,
          duration: `${editForm.duration} month${editForm.duration > 1 ? "s" : ""}` // converting back to "2 months"
        }),
      });
  
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Plan updated successfully.");
        window.location.href = "/admin/membership/list-of-membership-plan"; // optionally refresh or update state
      } else {
        alert("Failed to update plan.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  


  const handleDeletePlan = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this membership plan?");
    if (!isConfirmed) {
        return; // Exit if the user clicks "Cancel"
    }
    setDeletePlanId(id);
    try {
        const response = await fetch(`/admin/membership/list-of-membership-plan/delete?id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
            },
            body: JSON.stringify({ id: id }),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Successfully deleted.");
            window.location.href = "/admin/membership/list-of-membership-plan";
        }
    } catch (error) {
        console.error("Error submitting:", error);
    }
};







const handleSelectToEditPlan = (id) => {
  setSelectedToEditPlanId(id);
  const selectedPlan = get_all_plans.find(plan => plan.id === id);
  if (selectedPlan) {
    const durationMatch = selectedPlan.duration.match(/\d+/); // Extracts only the number
    const durationNumber = durationMatch ? parseInt(durationMatch[0]) : "";
    setEditForm({
      planName: selectedPlan.plan_name || "",
      description: selectedPlan.plan_description || "",
      price: selectedPlan.price || "",
      duration: durationNumber
    });
  }
};

  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">List Of Membership Plan</h5>

            <table className="table table-borderless datatable">
              <thead>
                <tr>
                  <th scope="col">Plan Name</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Option</th>
                </tr>
              </thead>
              <tbody> 
                { 
                get_all_plans.map((plan) => (
                    <tr key={plan.id}>
                      <td>{plan.plan_name}</td>
                      <td>
                        <span className="badge bg-success">{plan.duration}</span>
                      </td>
                      <td>
                        ₱
                        {!isNaN(parseInt(plan.price))
                          ? parseInt(plan.price).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{plan.plan_description}</td>
                      <td>
                      <a 
                            href="#" 
                            onClick={(e) => { 
                                e.preventDefault(); 
                                handleSelectToEditPlan(plan.id); 
                            }}
                        >
                            Edit
                        </a>
                        | 
                        <a 
                            href="#" 
                            onClick={(e) => { 
                                e.preventDefault(); 
                                handleDeletePlan(plan.id); 
                            }}
                        >
                            Delete
                        </a>
                      </td>
                    </tr>
                  ))
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">Edit Plan</h5>

            <form onSubmit={handleEditPlan}>
                    {/* Plan Name */}
                    <div className="row mb-3">
                        <label htmlFor="planName" className="col-sm-2 col-form-label">Plan Name</label>
                        <div className="col-sm-10">
                        <input
                          type="text"
                          id="planName"
                          name="planName"
                          className="form-control"
                          value={editForm.planName}
                          onChange={(e) => setEditForm({ ...editForm, planName: e.target.value })}
                        />

                        </div>
                    </div>

                    {/* Description */}
                    <div className="row mb-3">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <textarea
                          id="description"
                          name="description"
                          className="form-control"
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        />

                        </div>
                    </div>

                    {/* Price */}
                    <div className="row mb-3">
                        <label htmlFor="price" className="col-sm-2 col-form-label">Price (₱)</label>
                        <div className="col-sm-10">
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control"
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="row mb-3">
                        <label htmlFor="duration" className="col-sm-2 col-form-label">Duration (Months)</label>
                        <div className="col-sm-10">

                        
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            className="form-control"
                            value={editForm.duration}
                            onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                          />
                        </div>



                    </div>

                    {/* Submit Button */}
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfMembershipPlan;
