import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

const AddPlan = () => {

   
    const [addForm, setAddForm] = useState({
        planName: "",
        description: "",
        price: "",
        duration: ""
      });
      
      const handleAddPlan = async (e) => {
        e.preventDefault(); // this is the actual event object
        
        
        if (
            addForm.planName.trim() === "" ||
            addForm.description.trim() === "" ||
            addForm.price === "" ||
            addForm.duration === ""
          ) {
            alert("Please fill all the required fields.");
            return;
          }

        try {
          const response = await fetch(`/admin/membership/list-of-membership-plan/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
            },
            body: JSON.stringify({
              plan_name: addForm.planName,
              plan_description: addForm.description,
              price: addForm.price,
              duration: `${addForm.duration} month${addForm.duration > 1 ? "s" : ""}` // converting back to "2 months"
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

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Create a New Membership Plan</h5>
                <form onSubmit={handleAddPlan}>
                    {/* Plan Name */}
                    <div className="row mb-3">
                        <label htmlFor="planName" className="col-sm-2 col-form-label">Plan Name</label>
                        <div className="col-sm-10">
                        <input
                          type="text"
                          id="planName"
                          name="planName"
                          className="form-control"
                          value={addForm.planName}
                          onChange={(e) => setAddForm({ ...addForm, planName: e.target.value })}
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
                          value={addForm.description}
                          onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
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
                            value={addForm.price}
                            onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
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
                            value={addForm.duration}
                            onChange={(e) => setAddForm({ ...addForm, duration: e.target.value })}
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
    );
};

export default AddPlan;
