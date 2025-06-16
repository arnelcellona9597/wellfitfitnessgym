

import React, { useState } from 'react';
import { usePage } from "@inertiajs/react";

export default function ContactForm() {
    const { cu_user_id } = usePage().props;
  
  const [formData, setFormData] = useState({
    
          user_id: cu_user_id,
          name: '',
          email: '',
          number: '',
          message: ''
      });
  
      const [errors, setErrors] = useState({});
      const [successMessage, setSuccessMessage] = useState('');
      const [showForm, setShowForm] = useState(true);
      const [isSubmitting, setIsSubmitting] = useState(false);
   
  
      const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          setErrors({});
          setSuccessMessage('');
          setIsSubmitting(true);
      
          try {
              const response = await fetch('/contact', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                  },
                  body: JSON.stringify(formData)
              });
      
              // Check if the response is OK (status 200-299)
              if (!response.ok) {
                  const errorData = await response.json();
                  setErrors({ general: errorData.message || 'Wrong email or password!' });
                  return;
              }

              const result = await response.json();

              setSuccessMessage('Thank you for reaching out! Your message has been received by the administrator...');
              setFormData({
                user_id: cu_user_id,
                name: '',
                email: '',
                number: '',
                message: ''
              });
              setShowForm(false);


          } catch (error) {
              console.error('Error during activation:', error);
              setErrors({ general: 'General Error' });
          } finally {
              setIsSubmitting(false);
          }
      };


    return (
        <>
  {/* Contact Section Begin */}
  <section className="contact-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="section-title contact-title">
            <span>Contact Us</span>
            <h2>GET IN TOUCH</h2>
          </div>
          <div className="contact-widget">
            <div className="cw-text">
              <i className="fa fa-map-marker" />
              <p>
                Marwasa, Poblacion, Malita, 
               <br /> Davao Occidental
             </p>
            </div>
            <div className="cw-text">
              <i className="fa fa-mobile" />
              <ul>
              <li>0955-3241-066</li>
              <li>0909-840-8341</li>
              </ul>
            </div>
            <div className="cw-text email"> 
              <i className="fa fa-envelope" />
              <p>molaoshane@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="leave-comment">

          {errors.general && <p className="alert alert-danger">{errors.general}</p>}
          {successMessage && <p className="alert alert-success">{successMessage}</p>}

          {showForm && (
              <form onSubmit={handleSubmit} className="search-404">


                  <input
                      type="hidden"
                      name="user_id"
                      value={cu_user_id}
                      onChange={handleChange}
                      placeholder=""
                      required
                  />

                  <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name..."
                      required
                  />

                  <input
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="Enter Your Phone Number..."
                      required
                  />


                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email..."
                      required
                  />
                  
                  <textarea placeholder="Enter Your Message..." required name="message"  defaultValue={formData.message} onChange={handleChange} />

                  <br />
                  <button type="submit" className="color-white" disabled={isSubmitting}>
                      <i className="fa fa-sign-in"> </i> {isSubmitting ? 'Sending ...' : 'Send Email'}
                  </button>
              </form>
          )}

            {/* <form action="#">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Phone Number" />
              <textarea placeholder="Comment" defaultValue={""} />
              <button type="submit">Submit</button>
            </form> */}
          </div>
        </div>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1713.072999176153!2d125.60568216199574!3d6.409018040031026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f9e1d0a9a8b6a3%3A0x84aa0ebe26e5f5c6!2sWellfit%20Fitness%20Gym!5e0!3m2!1sen!2sph!4v1739642339523!5m2!1sen!2sph"
          height={550}
          style={{ border: 0 }}
          allowFullScreen=""
        />
      </div>
    </div>
  </section>

</>
    );
}
