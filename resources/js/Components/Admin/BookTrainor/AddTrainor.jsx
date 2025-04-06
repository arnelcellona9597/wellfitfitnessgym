import React, { useState } from "react";

const AddTrainor = () => {
  const [trainerName, setTrainerName] = useState("");
  const [trainerImage, setTrainerImage] = useState(null);

  const handleAddPlan = async (e) => {
    e.preventDefault();

    if (!trainerName.trim() || !trainerImage) {
      alert("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("trainer_name", trainerName);
    formData.append("trainer_image", trainerImage);

    try {
      const response = await fetch(`/admin/book-trainer/add-trainer/add`, {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Added Successfully.");
        // window.location.href = "/admin/book-trainer/trainer-list/";
      } else {
        alert("Failed to add trainor.");
      }
    } catch (error) {
      console.error("Adding failed:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add New Trainor</h5>
        <form onSubmit={handleAddPlan} encType="multipart/form-data">
          <div className="row mb-3">
            <label htmlFor="trainer_name" className="col-sm-2 col-form-label">Trainor Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                id="trainer_name"
                name="trainer_name"
                className="form-control"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="trainer_image" className="col-sm-2 col-form-label">Trainor Image</label>
            <div className="col-sm-10">
              <input
                type="file"
                id="trainer_image"
                name="trainer_image"
                className="form-control"
                onChange={(e) => setTrainerImage(e.target.files[0])}
              />
            </div>
          </div>

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

export default AddTrainor;
