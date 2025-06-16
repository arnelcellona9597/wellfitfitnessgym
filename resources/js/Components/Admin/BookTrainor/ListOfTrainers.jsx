import React, {   useState } from "react";
import { usePage } from "@inertiajs/react";
 
import DataTable from 'react-data-table-component';

const ListOfBookings = () => {
    const {   trainers } = usePage().props;

    const [searchQuery, setSearchQuery] = useState(""); // Search state


    const [editForm, setEditForm] = useState({
            trainerName: "",
            trainerImage: "",
            trainerLogDescription: "",
            trainerId: ""
    });
    const [selectedToEditPlanId, setSelectedToEditPlanId] = useState(null);

    const columns = [

        {
        name: 'Image',
        selector: row => <img src={`/template/images/${row.trainer_image}`} alt="Trainer" style={{ width: '50px' }} />,
        sortable: true,
        },
        {
            name: 'Trainer Name',
            selector: row => `${row.trainer_name}`,
            sortable: true,
        },
        
        {
          name: 'Description',
          selector: row => `${row.log_description || 'N/A'}`,
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
                    handleSelectToEditTrainer(row.id);
                    }}
                >
                    Edit
                </a>
                &nbsp;|&nbsp; 
                <a
                    href="#"
                    onClick={(e) => {
                    e.preventDefault();
                    handleDeleteTrainer(row.id);
                    }}
                >
                    Delete
                </a>
            </>
        ),
        },
    ];

 
 

    const handleEditTrainer = async (e) => {
        e.preventDefault();
    
        if (!selectedToEditPlanId) {
            alert("No trainer selected to edit.");
            return;
        }
    
        const formData = new FormData();
        formData.append("id", editForm.trainerId);
        formData.append("trainer_name", editForm.trainerName);
        formData.append("log_description", editForm.trainerLogDescription);
    
        if (editForm.trainerImage instanceof File) {
            formData.append("trainer_image", editForm.trainerImage);
        }

        console.log(editForm.trainerId+" : "+editForm.trainerName+" : "+editForm.trainerImage);
    
        try {
            const response = await fetch(`/admin/book-trainer/add-trainer/edit`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: formData,
            });
    
            const result = await response.json();
            console.log(result);
    
            if (response.ok) {
                alert("Updated successfully.");
                window.location.href = "/admin/book-trainer/trainer-list/";
            } else {
                alert("Failed to update.");
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };
    
    

    const handleSelectToEditTrainer = (id) => {
        setSelectedToEditPlanId(id);
        const selectedTrainer = trainers.find(trainer => trainer.id === id);
        if (selectedTrainer) {
            setEditForm({
                trainerName: selectedTrainer.trainer_name || "",
                trainerLogDescription: selectedTrainer.log_description || "",
                trainerImage: "", // Let the user choose a new image
                trainerId: selectedTrainer.id || ""
            });
        }
    };
    

  const handleDeleteTrainer = async (membershipId) => {
    console.log("Delete membership with ID:", membershipId);

    const isConfirmed = window.confirm("Are you sure you want to delete this trainer?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/admin/book-trainer/add-trainer/delete?id=${membershipId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: membershipId }),
      });

      if (response.ok) {
        alert("Successfully deleted.");
        window.location.href = "/admin/book-trainer/trainer-list/";
      } else {
        alert("Failed to delete membership.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };


  // Filter data based on search query
  const filteredData = trainers.filter(trainer => {
  
    const trainorName = trainer.trainer_name.toLowerCase();
    const trainorImage = trainer.trainer_image.toLowerCase();
    return (
        trainorName.includes(searchQuery.toLowerCase()) ||
        trainorImage.includes(searchQuery.toLowerCase())
    );
  });


 
  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">List Of Trainers</h5>
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
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">Edit Trainer</h5>

                <form onSubmit={handleEditTrainer} encType="multipart/form-data">

                    <input
                        type="hidden"
                        id="trainerId"
                        name="trainerId"
                        className="form-control"
                        value={editForm.trainerId}
                        onChange={(e) => setEditForm({ ...editForm, trainerId: e.target.value })}
                    />

                    {/* Plan Name */}
                    <div className="row mb-3">
                        <label htmlFor="trainerName" className="col-sm-2 col-form-label">Trainer Name</label>
                        <div className="col-sm-10">
                        <input
                          type="text"
                          id="trainerName"
                          name="trainerName"
                          className="form-control"
                          value={editForm.trainerName}
                          onChange={(e) => setEditForm({ ...editForm, trainerName: e.target.value })}
                        />

                        </div>
                    </div>
 
                    <div className="row mb-3">
                        <label htmlFor="trainerLogDescription" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <input
                          type="text"
                          id="trainerLogDescription"
                          name="trainerLogDescription"
                          className="form-control"
                          value={editForm.trainerLogDescription}
                          onChange={(e) => setEditForm({ ...editForm, trainerLogDescription: e.target.value })}
                        />

                        </div>
                    </div>

               
                    <div className="row mb-3">
                        <label htmlFor="trainerImage" className="col-sm-2 col-form-label">Trainer Image</label>
                        <div className="col-sm-10">
                        <input
                        type="file"
                        id="trainerImage"
                        name="trainerImage"
                        className="form-control"
                        onChange={(e) => setEditForm({ ...editForm, trainerImage: e.target.files[0] })}
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

export default ListOfBookings;
