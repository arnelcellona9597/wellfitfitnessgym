const AvailMembershipPlan = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Select a member account to join the WellFit Fitness plan.</h5>
          <form>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select an Account:</label>
              <div className="col-sm-10">
                <select className="form-select" aria-label="Default select example">
                  <option selected disabled>Select an Account</option>
                  <option value="1">John Doe</option>
                  <option value="2">Mark Williams</option>
                  <option value="3">Jade Smith</option>
                </select>
              </div>
            </div>


            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select Membership Plan:</label>
              <div className="col-sm-10">
                <select className="form-select" aria-label="Default select example">
                  <option selected disabled>Select Membership Plan</option>
                  <option value="1">STARTER FIT PLAN</option>
                  <option value="2">FLEX PRO PLAN</option>
                  <option value="3">COMMIT TO FIT PLAN</option>
                  <option value="4">ULTIMATE FIT PLAN</option>
                </select>
              </div>
            </div>


            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Select Plan Duration:</label>
              <div className="col-sm-10">
                <select className="form-select" aria-label="Default select example">
                  <option selected disabled>Select Plan Duration</option>
                  <option value="1">1 Month</option>
                  <option value="2">3 Months</option>
                  <option value="3">6 Months</option>
                  <option value="4">12 Months</option>
                </select>
              </div>
            </div>

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
  
  export default AvailMembershipPlan;