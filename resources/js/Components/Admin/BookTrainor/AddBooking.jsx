import React, { useState } from "react";
import { usePage } from "@inertiajs/react"; 
import dayjs from "dayjs";
const adminAddBooking = () => {

    const { all_users, trainers } = usePage().props;

    // States to hold selected user_id and trainer_id
    const [userId, setUserId] = useState("");
    const [trainerId, setTrainerId] = useState("");
    const [trainerTimeSchedule, setTrainerTimeSchedule] =useState("8:00am - 9:30am");
    const [trainerStartDate, setTrainerStartDate] = useState("");
    const [trainerDuration, setTrainerDuration] = useState("1 Month");
    
    const [minDate, setMinDate] = useState("");

    const handleBookTrainer = async () => { 
      if (userId === "" || trainerId === "") {
        alert("Please fill the form before submitting.");
        return;
      }
    
      const selectedTrainer = trainers.find(trainer => trainer.id == trainerId);
    
      if (!selectedTrainer) {
        alert("Selected trainer not found.");
        return;
      }
    

      const durationMonths = parseInt(trainerDuration);
      const startDate = dayjs(trainerStartDate);
      const endDate = startDate.add(durationMonths, 'month');

      const getMonthInt = parseInt(trainerDuration);
      const trainer_total_price = getMonthInt  * 2000;

      try {
          const response = await fetch('/trainer-over-the-counter-payment', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
              },
              body: JSON.stringify({

                  trainer_user_id:  userId,
                  trainer_id:  trainerId,
                  trainer_payment_method: "Over The Counter",
                  trainer_status: "Approved",
                  trainer_duration: trainerDuration,
                  trainer_time_schedule: trainerTimeSchedule,
                  trainer_total_price: trainer_total_price,
                  trainer_start_date : trainerStartDate,
                  trainer_end_date : endDate.format("YYYY-MM-DD"),
           
        
              }),
          });

  
          if (!response.ok) {
              const result = await response.json();
              setErrors({ general: result.message || "Error submitting!" });
              return;
          }
          else {
              alert("Bookings has been successfully created.");
              window.location.href = "/admin/book-trainer/booking-list/";
          }
      } catch (error) {
          console.error("Error submitting:", error);
          setErrors({ general: "Something went wrong. Please try again!" });
          return;
      }


    };
    
    

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Select a member account and trainer to book a class session.</h5>
          <form>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select an Account:</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="user_id"
                  value={userId} // Binding value to userId state
                  onChange={(e) => setUserId(e.target.value)} // Update userId state
                >
                  <option    >Select an Account</option>
                  { 
                    all_users.map((user) => ( 
                      <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select Membership Trainer:</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="trainer_id"
                  value={trainerId} // Binding value to trainerId state
                  onChange={(e) => setTrainerId(e.target.value)} // Update trainerId state
                >
                  <option  >Select Membership Trainer</option>
                  { 
                    trainers.map((trainer) => ( 
                      <option key={trainer.id} value={trainer.id}>{trainer.trainer_name}</option>
                    ))
                  }
                </select>
              </div>
            </div>




            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select Time Schedule:</label>
              <div className="col-sm-10">
              <input 
                className="trainer_start_date form-select" 
                value={trainerStartDate}  
                onChange={(e) => setTrainerStartDate(e.target.value)}  
                type="date" min={minDate} />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select Time Schedule:</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="trainer_time_schedule"
                  value={trainerId}  
                  onChange={(e) => setTrainerTimeSchedule(e.target.value)}  
                >
                    <option value="8:00am - 9:30am">8:00am - 9:30am</option>
                    <option value="9:30am - 11:00am">9:30am - 11:00am</option>
                    <option value="11:00am - 12:30pm">11:00am - 12:30pm</option>
                    <option value="12:30pm - 2:00pm">12:30pm - 2:00pm</option>
                    <option value="2:00pm - 3:30pm">2:00pm - 3:30pm</option>

                </select>
              </div>
            </div>


            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select Duration:</label>
              <div className="col-sm-10">
              <select 
                className="trainer_duration form-select" 
                name="trainer_duration"
                value={trainerDuration} // Use trainerDuration instead of paymentMethod
                onChange={(e) => setTrainerDuration(e.target.value)} // Update trainerDuration correctly
            >
                <option selected value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
            </select>
              </div>
            </div>





            <div className="row mb-3">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBookTrainer();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
};

export default adminAddBooking;
