import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import DataTable from 'react-data-table-component';

const ListOfGalleryImages = () => {
    const {   get_all_images } = usePage().props;

    const [searchQuery, setSearchQuery] = useState(""); // Search state
 

    const [editForm, setEditForm] = useState({
            galleryImage: "",
            galleryId: ""
    });
    const [selectedToEditImageId, setSelectedToEditImageId] = useState(null);

    const columns = [

        { 
        name: 'Image',
        selector: row => <img src={`/template/images/${row.gallery_image}`} alt="Trainer" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />,
        sortable: true,
        },
 
        {
        name: 'Option',
        cell: row => (
    

            <>
            
                &nbsp;|&nbsp; 
                <a
                    href="#"
                    onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage(row.id);
                    }}
                >
                    Delete
                </a>
            </>
        ),
        },
    ];

  

  const handleDeleteImage = async (ImageId) => {
    console.log("Delete membership with ID:", ImageId);
    const isConfirmed = window.confirm("Are you sure you want to delete this image?");
    if (!isConfirmed) return;
    try {
      const response = await fetch(`/admin/gallery/add-image/delete?id=${ImageId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify({ id: ImageId }), 
      });
      if (response.ok) {
        alert("Successfully deleted.");
        window.location.href = "/admin/gallery/list-image";
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };


//   Filter data based on search query
  const filteredData = get_all_images.filter(item => {
    const galleryImage = item.gallery_image.toLowerCase();
    return (
        galleryImage.includes(searchQuery.toLowerCase())
     
    );
  });


 
  return (
    <div>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">List Of Images</h5>
            <DataTable
              columns={columns}
              pagination
              data={filteredData} 
              highlightOnHover
              subHeader
            //   subHeaderComponent={
            //     <input
            //       type="text"
            //       placeholder="Search"
            //       onChange={(e) => setSearchQuery(e.target.value)}
            //       style={{ width: "100%", margin: "0" }}
            //     />
            //   }
            /> 
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default ListOfGalleryImages;
