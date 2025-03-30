import React from "react";

const ListOfMembers = () => {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">List Of Members</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">Member Name</th>
                <th scope="col">Plan Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Raheem Lehner</td>
                <td>Basic Plan</td>
                <td>June 1, 2025</td>
                <td>August 1, 2025</td>
                <td><span className="badge bg-success">Approved</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>Premium Plan</td>
                <td>May 15, 2025</td>
                <td>July 15, 2025</td>
                <td><span className="badge bg-warning">Pending</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Gold Plan</td>
                <td>April 20, 2025</td>
                <td>June 20, 2025</td>
                <td><span className="badge bg-success">Approved</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>Robert Brown</td>
                <td>Silver Plan</td>
                <td>March 10, 2025</td>
                <td>May 10, 2025</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>Emily White</td>
                <td>Platinum Plan</td>
                <td>February 5, 2025</td>
                <td>April 5, 2025</td>
                <td><span className="badge bg-success">Approved</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>Michael Johnson</td>
                <td>Basic Plan</td>
                <td>January 1, 2025</td>
                <td>March 1, 2025</td>
                <td><span className="badge bg-warning">Pending</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>Sarah Wilson</td>
                <td>Premium Plan</td>
                <td>December 10, 2024</td>
                <td>February 10, 2025</td>
                <td><span className="badge bg-success">Approved</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>David Martinez</td>
                <td>Gold Plan</td>
                <td>November 15, 2024</td>
                <td>January 15, 2025</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
              <tr>
                <td>Daniel King</td>
                <td>Platinum Plan</td>
                <td>November 1, 2023</td>
                <td>January 1, 2024</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
                <td><a href="#">Approve</a> | <a href="#">Cancel</a> | <a href="#">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOfMembers;