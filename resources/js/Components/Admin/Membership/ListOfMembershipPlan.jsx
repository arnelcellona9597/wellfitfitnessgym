import React from "react";

const ListOfMembershipPlan = () => {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">List Of Membership Plan</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">Plan Name</th>
                <th scope="col">Duration</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td>STARTER FIT PLAN</td>
                <td><span className="badge bg-success">1 Month</span></td>
                <td>₱2,500</td>
                <td>Enjoy unlimited gym access with top-quality equipment, hot & cold showers, cold filtered drinking water, free WiFi, and professional, friendly staff. Stay fit today!</td>
                <td><a href="#">Edit</a> | <a href="#">Delete</a> </td>
              </tr>

              <tr>
                <td>FLEX PRO PLAN </td>
                <td><span className="badge bg-success">3 Months</span></td>
                <td>₱6,000</td>
                <td>Commit to 3 months of fitness with unlimited gym access, high-end equipment, hot & cold showers, purified drinking water, free WiFi, and expert staff.</td>
                <td><a href="#">Edit</a> | <a href="#">Delete</a> </td>
              </tr>

              <tr>
                <td>COMMIT TO FIT PLAN </td>
                <td><span className="badge bg-success">6 Months</span></td>
                <td>₱11,000</td>
                <td>Level up with 6 months of unlimited access! Train with premium gym equipment, enjoy hot & cold showers, purified water, WiFi, and expert staff support.</td>
                <td><a href="#">Edit</a> | <a href="#">Delete</a> </td>
              </tr>

              <tr>
                <td>ULTIMATE FIT PLAN </td>
                <td><span className="badge bg-success">12 Months</span></td>
                <td>₱18,000</td>
                <td>Achieve your ultimate fitness goals with 1 year of unlimited access! Premium equipment, hot & cold showers, filtered water, free WiFi, and expert trainers.</td>
                <td><a href="#">Edit</a> | <a href="#">Delete</a> </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOfMembershipPlan;