
import React from 'react';
import { usePage } from "@inertiajs/react";

export default function Gallery() {
    
    const { get_all_images } = usePage().props;
    
    return (
       <>
           <div className="gallery-section custom-gallery-section">
            <div className="gallery">
                <div className="grid-sizer"></div>

                {get_all_images.map((image) => ( 
                    <div className="gs-item set-bg">
                        <img src={`/template/images/${image.gallery_image}`} alt="image"/>
                    </div>
                 ))}

            </div>
        </div>
       </>
    );
}
