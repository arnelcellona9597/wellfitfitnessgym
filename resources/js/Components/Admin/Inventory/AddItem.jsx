import React, { useState } from "react";


const AddItem = () => {

    const [inventoryName, setInventoryName] = useState("");
    const [inventoryDescription, setInventoryDescription] = useState("");
    const [inventoryQuantity, setInventoryQuantity] = useState("");
    const [inventoryImage, setInventoryImage] = useState(null);

    const handleAddPlan = async (e) => { 
        e.preventDefault();
        
        if (
            !inventoryName.trim() || 
            !inventoryDescription.trim() ||
            !inventoryQuantity.trim() ||
            !inventoryImage
        ) {
          alert("Please fill all the required fields.");
          return;
        }
        const formData = new FormData();

        formData.append("inventory_name", inventoryName);
        formData.append("inventory_description", inventoryDescription);
        formData.append("inventory_quantity", inventoryQuantity);
        formData.append("inventory_image", inventoryImage);

        try {
          const response = await fetch(`/admin/inventory/add-item/add`, {
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
            window.location.href = "/admin/inventory/list-item";
          } else {
            alert("Failed to add trainer.");
          }
        } catch (error) {
          console.error("Adding failed:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add New Item</h5>
                <form onSubmit={handleAddPlan} encType="multipart/form-data">
                    {/* Item Name */}
                    <div className="row mb-3">
                        <label htmlFor="inventory_name" className="col-sm-2 col-form-label">Item Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                id="inventory_name"
                                name="inventory_name"
                                className="form-control"
                                value={inventoryName}
                                onChange={(e) => setInventoryName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="row mb-3">
                        <label htmlFor="inventory_description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea id="inventory_description" name="inventory_description" className="form-control" value={inventoryDescription}
                                onChange={(e) => setInventoryDescription(e.target.value)} ></textarea>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="row mb-3">
                        <label htmlFor="inventory_quantity" className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                id="inventory_quantity"
                                name="inventory_quantity"
                                className="form-control"
                                value={inventoryQuantity}
                                onChange={(e) => setInventoryQuantity(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="row mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
                        <div className="col-sm-10">
                        <input
                            type="file"
                            id="inventory_image"
                            name="inventory_image"
                            className="form-control"
                            onChange={(e) => setInventoryImage(e.target.files[0])}
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

export default AddItem;
