import React, { useState } from "react";


const AddGalleryImage = () => {

    const [galleryImage, setGalleryImage] = useState(null);

    const handleAddPlan = async (e) => { 
        e.preventDefault();
        
        if (
            !galleryImage
        ) {
          alert("Please fill all the required fields.");
          return;
        }
        const formData = new FormData();

        formData.append("gallery_image", galleryImage);

        try {
          const response = await fetch(`/admin/gallery/add-image/add`, {
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
            window.location.href = "/admin/gallery/list-image";
          } else {
            alert("Failed to add.");
          }
        } catch (error) {
          console.error("Adding failed:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add New Image</h5>
                <form onSubmit={handleAddPlan} encType="multipart/form-data">
                     
                    {/* Image Upload */}
                    <div className="row mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
                        <div className="col-sm-10">
                        <input
                            type="file"
                            id="gallery_image"
                            name="gallery_image"
                            className="form-control"
                            onChange={(e) => setGalleryImage(e.target.files[0])}
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

export default AddGalleryImage;
