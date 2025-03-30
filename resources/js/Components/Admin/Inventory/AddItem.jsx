const AddItem = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add New Item</h5>
                <form>
                    {/* Item Name */}
                    <div className="row mb-3">
                        <label htmlFor="itemName" className="col-sm-2 col-form-label">Item Name</label>
                        <div className="col-sm-10">
                            <input type="text" id="itemName" name="itemName" className="form-control" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="row mb-3">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea id="description" name="description" className="form-control"></textarea>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="row mb-3">
                        <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input type="number" id="quantity" name="quantity" className="form-control" />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="row mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
                        <div className="col-sm-10">
                            <input type="file" id="image" name="image" className="form-control" />
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

export default AddItem;
