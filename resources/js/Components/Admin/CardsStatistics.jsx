import React from 'react';

export default function AdminCardsStatistics() {
    return (
        <>
            <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Sales <span>| All-Time </span>
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-info-circle" />
                            </div>
                            <div className="ps-3">
                                <h6>₱ 145</h6>
                                <span className="text-muted small pt-2 ps-1">Total revenue generated from memberships, and training.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Total Members <span>| All-Time </span>
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-people" />
                            </div>
                            <div className="ps-3">
                                <h6>145</h6>
                                <span className="text-muted small pt-2 ps-1">
                                    The total number of individuals who availed membership plan.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Book for Trainer <span>| All-Time </span>
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-calendar-check" />
                            </div>
                            <div className="ps-3">
                                <h6>145</h6>
                                <span className="text-muted small pt-2 ps-1">
                                    The total number of personal training sessions booked.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Total Equipment <span>| All-Time </span>
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-tools" />
                            </div>
                            <div className="ps-3">
                                <h6>145</h6>
                                <span className="text-muted small pt-2 ps-1">
                                    Total number of fitness equipment available.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Staffs and Trainers <span>| All-Time </span>
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-person-badge" />
                            </div>
                            <div className="ps-3">
                                <h6>145</h6>
                                <span className="text-muted small pt-2 ps-1">
                                    The total number of professional trainers.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Reviews <span>| All-Time </span>
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-star-fill" />
                            </div>
                            <div className="ps-3">
                                <h6>145</h6>
                                <span className="text-muted small pt-2 ps-1">
                                    Total number of feedback received from members.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
