import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react"; 

export default function Profile() {
    const { get_user_info, cu_user_id } = usePage().props;

    // State to store the form data
    const [formData, setFormData] = useState({
        id: cu_user_id || "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
        profile: null, 
        password: "",
        confirm_password: "",
    });

    // State for errors, success messages, and form visibility
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate formData when get_user_info is available
    useEffect(() => {
        if (get_user_info) {
            setFormData((prevData) => ({
                ...prevData,
                first_name:  "",
                last_name:  "",
                email: "",
                phone:  "",
                age:  "",
                gender: "",
                address:  "",
                password: "",  
                confirm_password: "",
            }));
        }
    }, [get_user_info]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input separately
    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            profile: e.target.files[0],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");
        setIsSubmitting(true);
    
 
        if (formData.password || formData.confirm_password) {
            if (formData.password.length < 6) {
                setErrors({ err_msg: "Password must be at least 6 characters long!" });
                setIsSubmitting(false);
                return;
            }
            if (formData.password !== formData.confirm_password) {
                setErrors({ err_msg: "Passwords do not match!" });
                setIsSubmitting(false);
                return;
            }
        }
        else if (
            !formData.profile &&
            !formData.first_name &&
            !formData.last_name &&
            !formData.email &&
            !formData.phone &&
            !formData.age &&
            !formData.gender &&
            !formData.address &&
            !formData.password &&
            !formData.confirm_password
        ) {
            setErrors({ err_msg: "The form connot be emtpy!" });
            setIsSubmitting(false);
            return;
        } 
    
        // Create a FormData instance for file uploads
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                formDataToSend.append(key, formData[key]);
            }
        });
    

        try {
            const response = await fetch("/member/profile", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                body: formDataToSend,
            });
    
            const result = await response.json();
            if (!response.ok) {
                setErrors({ general: result.message || "Error submitting!" });
                return;
            }
    
            setSuccessMessage("Successfully updated! Refreshing the page in 3 seconds ...");
            setShowForm(false);
            setTimeout(() => {
                window.location.href = "/member/profile";
            }, 3000);
    
        } catch (error) {
            console.error("Error submitting:", error);
            setErrors({ general: "Something went wrong. Please try again!" });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    

    return (
        <section className="bmi-calculator-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-title chart-title">
                            <span>Your real-time information</span>
                            <h2>Personal Information</h2>
                        </div>
                        <div className="chart-table">
                            {get_user_info && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name:</th>
                                            <th>
                                                {get_user_info.first_name} {get_user_info.last_name}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="point">Email:</td>
                                            <td>{get_user_info.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="point">Contact Number:</td>
                                            <td>{get_user_info.phone}</td>
                                        </tr>
                                        <tr>
                                            <td className="point">Age:</td>
                                            <td>
                                            {get_user_info.age && `${get_user_info.age} Years Old`}
                                            </td>

                                        </tr>
                                        <tr>
                                            <td className="point">Gender:</td>
                                            <td>{get_user_info.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="point">Address:</td>
                                            <td>{get_user_info.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="section-title chart-calculate-title">
                            <span>Fill out the form to update your personal data.</span>
                            <h2>UPDATE YOUR PROFILE</h2>
                        </div>
                        <div className="chart-calculate-form">
                            {errors.general && (
                                <p className="alert alert-danger">{errors.general}</p>
                            )}
                            {successMessage && (
                                <p className="alert alert-success">{successMessage}</p>
                            )}
                     
                            {showForm && (
                                <form
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    <div className="row">
                                        <input type="hidden" value={formData.id} name="id" />

                                        <div className="col-sm-6">
                                            <input type="text" placeholder="First Name" name="first_name" onChange={handleChange} />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" placeholder="Last Name" name="last_name" onChange={handleChange} />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="number" placeholder="Contact Number" name="phone" onChange={handleChange} />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="number" min="8" max="120" placeholder="Age" name="age" onChange={handleChange} />
                                        </div>
                                        <div className="col-sm-6">
                                            <select name="gender" onChange={handleChange}>
                                                <option disabled  >Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>

                                        <div className="col-sm-12">
                                            <input type="text" placeholder="Address" name="address" onChange={handleChange} />
                                        </div>

                                        <div className="col-sm-12">
                                            <input type="file" name="profile" onChange={handleFileChange} />
                                        </div>

                                        <div className="col-sm-12">
                                            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                                        </div>

                                        <div className="col-sm-12">
                                            <input type="password" placeholder="Confirm Password" name="confirm_password" onChange={handleChange} />
                                           
                                            {errors.err_msg && <p className="alert alert-danger">{errors.err_msg}</p>}

                                        </div>

                                        <div className="col-lg-12">
                                            <button type="submit" className="color-white" disabled={isSubmitting}>
                                                {isSubmitting ? "Submitting..." : "Submit"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
