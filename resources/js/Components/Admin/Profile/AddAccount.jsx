import React, { useState } from "react";

const AddUserAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Generate a random 10-digit verification code
  const generateVerificationCode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all the required fields.");
      return;
    }

    // Optional: basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("verification_code", generateVerificationCode());

    console.log('first_name: '+ firstName); 
    console.log('last_name: '+ lastName); 
    console.log('email: '+ email); 
    console.log('password: '+ password); 
    console.log('verification_code: '+ generateVerificationCode()); 
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

      const response = await fetch(`/admin/signup`, {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Account added successfully.");
        window.location.href = "/admin/list-account";
      } else {
        alert(result?.message || "Failed to add account.");
      }
    } catch (error) {
      console.error("Adding failed:", error);
      alert("An error occurred while adding the account.");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add/Register an Account</h5>
        <form onSubmit={handleAddAccount}>
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

          {/* Password */}
          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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

export default AddUserAccount;
