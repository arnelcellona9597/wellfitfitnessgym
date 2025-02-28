import React from "react";
import { usePage } from "@inertiajs/react";

export default function Reviews() {

    
      const { reviews } = usePage().props;
  
          const dateFormatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
      
        const renderStars = (rate) => {
          const totalStars = 5;
          const filledStars = Math.min(rate, totalStars);
          const unfilledStars = totalStars - filledStars;
       
          return (
              <>
                  {[...Array(filledStars)].map((_, index) => (
                      <i key={`filled-${index}`} className="fa fa-star filled-star" />
                  ))}
                  {[...Array(unfilledStars)].map((_, index) => (
                      <i key={`unfilled-${index}`} className="fa fa-star unfilled-star" />
                  ))}
              </>
          );
      };

    return (
       <>  
 
  


  <section className="testimonial-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title">
            <span>Testimonial</span>
            <h2>Our client say</h2>
          </div>
        </div>
      </div>
      <div className="ts_slider owl-carousel">


 
      {reviews.map((review) => (
  
          <div className="ts_item">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="ti_pic">
                  <img  src={review?.profile 
                          ? `/template/images/${review.profile}` 
                          : "/template/member/img/Portrait_Placeholder.png"} 
                      alt="profile" 
                        
                  />
                </div>
                <div className="ti_text">
                  <p>
                  {review.comment}
                  <br/>
                  <p className="review_date" >{dateFormatter.format(new Date(review.created_at))}</p>
                  </p>
                 
                  <h5>{review.first_name} {review.last_name}</h5>
                  <div className="tt-rating">
                    {renderStars(review.rate)}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
      
      ))} 

      </div>
      <a href="/signin/" className="primary-btn btn-normal appoinment-btn reviewsbtn">Login to Write Reviews</a>
    </div>
  </section>

</>

        
    );
}
