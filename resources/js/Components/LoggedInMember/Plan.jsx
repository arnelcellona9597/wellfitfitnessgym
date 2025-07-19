import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";

export default function MemberPlan() {
    const { get_all_plans, cu_user_id, get_user_membership } = usePage().props;

    const today = dayjs();

    const hasActiveOrPendingPlan = get_user_membership.some((plan) => {
        const start = dayjs(plan.start_date);
        const end = dayjs(plan.end_date);

        return (
            plan.status === "Pending" ||
            (plan.status === "Approved" && today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day')))
        );
    });

    return (
        <section className="pricing-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <span>Our Membership Plans</span>
                            <h2>Choose the Best Plan for Your Fitness Journey</h2>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    {get_all_plans.map((plan) => (
                        <div className="col-lg-3 col-md-8" key={plan.id}>
                            <div className="ps-item">
                                <h3>{plan.duration}</h3>
                                <div className="pi-price">
                                    <h2>₱{parseInt(plan.price).toLocaleString()}</h2>
                                    <span>{plan.plan_name}</span>
                                </div>
                                <ul>
                                    <li>{plan.plan_description}</li>
                                </ul>

                                {!hasActiveOrPendingPlan && (
                                    <a href={`/member/plan/form?id=${plan.id}&user_id=${cu_user_id}`} className="primary-btn pricing-btn planBTN">
                                        Avail Now
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
