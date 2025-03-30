const AddPlan = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Create a New Membership Plan</h5>
                <form>
                    {/* Plan Name */}
                    <div className="row mb-3">
                        <label htmlFor="planName" className="col-sm-2 col-form-label">Plan Name</label>
                        <div className="col-sm-10">
                            <input type="text" id="planName" name="planName" className="form-control" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="row mb-3">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea id="description" name="description" className="form-control"></textarea>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="row mb-3">
                        <label htmlFor="price" className="col-sm-2 col-form-label">Price (₱)</label>
                        <div className="col-sm-10">
                            <input type="number" id="price" name="price" className="form-control" />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="row mb-3">
                        <label htmlFor="duration" className="col-sm-2 col-form-label">Duration (Months)</label>
                        <div className="col-sm-10">
                            <input type="number" id="duration" name="duration" className="form-control" />
                        </div>
                    </div>

                    {/* Submit Button */}
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

export default AddPlan;
