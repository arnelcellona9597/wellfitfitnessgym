
import React from 'react';

export default function Gallery() {
    return (
       <>
           <div className="gallery-section">
            <div className="gallery">
                <div className="grid-sizer"></div>
                <div className="gs-item grid-wide set-bg" data-setbg="/template/member/img/gallery/gallery-1.jpg">
                    <a  className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></a>
                </div>
                <div className="gs-item set-bg" data-setbg="/template/member/img/gallery/gallery-2.jpg">
                    <a   className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></a>
                </div>
                <div className="gs-item set-bg" data-setbg="/template/member/img/gallery/gallery-3.jpg">
                    <a   className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></a>
                </div>
                <div className="gs-item set-bg" data-setbg="/template/member/img/gallery/gallery-4.jpg">
                    <a   className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></a>
                </div>
                <div className="gs-item set-bg" data-setbg="/template/member/img/gallery/gallery-5.jpg">
                    <a   className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></a>
                </div>
                <div className="gs-item grid-wide set-bg" data-setbg="/template/member/img/gallery/gallery-6.jpg">
                    <a   className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></a>
                </div>
            </div>
        </div>
       </>
    );
}
