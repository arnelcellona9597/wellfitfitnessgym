import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react"; 

const UpdateViewProfile = () => { 
  const { user_data_by_get_request, id } = usePage().props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddess] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(null);

  // Prepopulate form fields when user_data_by_get_request is available
  useEffect(() => {
    if (user_data_by_get_request) {
      setFirstName(user_data_by_get_request.first_name || "");
      setLastName(user_data_by_get_request.last_name || "");
      setPhone(user_data_by_get_request.phone || "");
      setEmail(user_data_by_get_request.email || "");
      setAge(user_data_by_get_request.age || "");
      setGender(user_data_by_get_request.gender || "");
      setAddess(user_data_by_get_request.address || "");
      setPassword(user_data_by_get_request.password || "");  // Prepopulate password (be cautious about security)
      setConfirmPassword(user_data_by_get_request.password || "");  // Prepopulate confirm password (same as password)
    }
  }, [user_data_by_get_request]);

  const handleAddPlan = async (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      alert("Please fill all the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("password", password);

    // Only append profile image if it has been selected
    if (profile) {
      formData.append("profile", profile);
    }

    try {
      const response = await fetch(`/member/profile`, {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Updated Successfully.");
        window.location.href = "/admin/list-account";
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Update Personal Information</h5>
        <form onSubmit={handleAddPlan} encType="multipart/form-data">
          {/* First Name */}
          <div className="row mb-3">
            <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="row mb-3">
            <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="row mb-3">
            <label htmlFor="phone" className="col-sm-2 col-form-label">Contact Number</label>
            <div className="col-sm-10">
              <input
                type="number"
                id="phone"
                name="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Age */}
          <div className="row mb-3">
            <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
            <div className="col-sm-10">
              <input
                type="number"
                id="age"
                name="age"
                className="form-control"
                value={age}
                min="8"
                max="120"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="row mb-3">
            <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
            <div className="col-sm-10">
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="row mb-3">
            <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
            <div className="col-sm-10">
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddess(e.target.value)}
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className="row mb-3">
            <label htmlFor="profile" className="col-sm-2 col-form-label">Profile</label>
            <div className="col-sm-10">
              <input
                type="file"
                id="profile"
                name="profile"
                className="form-control"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
          </div>

          {/* Password */}
          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="row mb-3">
            <label htmlFor="confirm_password" className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-10">
              <input
                type={showPassword ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Show Password Toggle */}
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword" className="form-check-label">Show Password</label>
              </div>
            </div>
          </div>

          {/* Submit */}
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

export default UpdateViewProfile;
