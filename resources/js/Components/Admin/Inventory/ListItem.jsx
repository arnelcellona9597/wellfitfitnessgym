import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import DataTable from 'react-data-table-component';

const ListOfInventoryItems = () => {
    const {   get_all_inventory_items } = usePage().props;

    const [searchQuery, setSearchQuery] = useState(""); // Search state


    const [editForm, setEditForm] = useState({
            inventoryName: "",
            inventoryDescription: "",
            inventoryQuantity: "",
            inventoryImage: "",
            inventoryId: ""
    });
    const [selectedToEditItemId, setSelectedToEditInventoryId] = useState(null);

    const columns = [

        { 
        name: 'Image',
        selector: row => <img src={`/template/images/${row.inventory_image}`} alt="Trainer" style={{ width: '50px' }} />,
        sortable: true,
        },
        {
            name: 'Name',
            selector: row => `${row.inventory_name}`,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => `${row.inventory_description}`,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => `${row.inventory_quantity}`,
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
                    handleSelectToEditItem(row.id);
                    }}
                >
                    Edit
                </a>
                &nbsp;|&nbsp; 
                <a
                    href="#"
                    onClick={(e) => {
                    e.preventDefault();
                    handleDeleteItem(row.id);
                    }}
                >
                    Delete
                </a>
            </>
        ),
        },
    ];

 
 

    const handleEditItem = async (e) => {
        e.preventDefault();
    
        if (!selectedToEditItemId) {
            alert("No selected to edit.");
            return;
        }
    
        const formData = new FormData();
        formData.append("id", editForm.inventoryId);
        formData.append("inventory_name", editForm.inventoryName);
        formData.append("inventory_description", editForm.inventoryDescription);
        formData.append("inventory_quantity", editForm.inventoryQuantity);
   

        if (editForm.inventoryImage instanceof File) {
            formData.append("inventory_image", editForm.inventoryImage);
        }

        try {
            const response = await fetch(`/admin/inventory/add-item/edit`, {
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
                window.location.href = "/admin/inventory/list-item";
            } else {
                alert("Failed to update.");
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };
    
    

    const handleSelectToEditItem = (id) => {
        setSelectedToEditInventoryId(id);
        const selectedItem = get_all_inventory_items.find(item => item.id === id);
        if (selectedItem) {
            setEditForm({
                inventoryName: selectedItem.inventory_name || "",
                inventoryDescription: selectedItem.inventory_description || "",
                inventoryQuantity: selectedItem.inventory_quantity || "",
                inventoryImage: "",  
                inventoryId: selectedItem.id || ""
            });
        }
    };
    

  const handleDeleteItem = async (ItemId) => {
    console.log("Delete membership with ID:", ItemId);
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return;
    try {
      const response = await fetch(`/admin/inventory/add-item/delete?id=${ItemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: ItemId }),
      });
      if (response.ok) {
        alert("Successfully deleted.");
        window.location.href = "/admin/inventory/list-item";
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };


  // Filter data based on search query
  const filteredData = get_all_inventory_items.filter(item => {
  
    const inventoryName = item.inventory_name.toLowerCase();
    const inventoryDescription = item.inventory_description.toLowerCase();
    const inventoryQuantity = item.inventory_quantity.toLowerCase();
    // const inventoryImage = item.inventory_image.toLowerCase();
    return (
        inventoryName.includes(searchQuery.toLowerCase()) ||
        inventoryDescription.includes(searchQuery.toLowerCase()) ||
        inventoryQuantity.includes(searchQuery.toLowerCase()) 
        // inventoryImage.includes(searchQuery.toLowerCase())
    );
  });


 
  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">List Of Items</h5>
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
            <h5 className="card-title">Edit Item</h5>

                <form onSubmit={handleEditItem} encType="multipart/form-data">
                   
                    
                    <input
                        type="hidden"
                        id="inventoryId"
                        name="inventoryId"
                        className="form-control"
                        value={editForm.inventoryId}
                        onChange={(e) => setEditForm({ ...editForm, inventoryId: e.target.value })}
                    />

         
                    <div className="row mb-3">
                        <label htmlFor="inventoryName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                        <input
                          type="text"
                          id="inventoryName"
                          name="inventoryName"
                          className="form-control"
                          value={editForm.inventoryName}
                          onChange={(e) => setEditForm({ ...editForm, inventoryName: e.target.value })}
                        />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="inventoryDescription" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <textarea
                          type="description"
                          id="inventoryDescription"
                          name="inventoryDescription"
                          className="form-control"
                          value={editForm.inventoryDescription}
                          onChange={(e) => setEditForm({ ...editForm, inventoryDescription: e.target.value })}
                        ></textarea>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="inventoryQuantity" className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                        <input
                          type="text"
                          id="inventoryQuantity"
                          name="inventoryQuantity"
                          className="form-control"
                          value={editForm.inventoryQuantity}
                          onChange={(e) => setEditForm({ ...editForm, inventoryQuantity: e.target.value })}
                        />
                        </div>
                    </div>

                  
                    <div className="row mb-3">
                        <label htmlFor="inventoryImage" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                        <input
                        type="file"
                        id="inventoryImage"
                        name="inventoryImage"
                        className="form-control"
                        onChange={(e) => setEditForm({ ...editForm, inventoryImage: e.target.files[0] })}
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

export default ListOfInventoryItems;
