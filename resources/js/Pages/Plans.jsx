import React from 'react';
import MemberHead from '@/Components/Member/Head';
import MemberHeader from '@/Components/Member/Header';
import MemberPlansBanner from '@/Components/Member/PlansBanner';
import MemberFooter from '@/Components/Member/Footer';
import MemberPlan from '@/Components/Member/Plan';


export default function Plans() {
    return (
    <>
    
      <MemberHead />
      <MemberHeader />
      <MemberPlansBanner />
      <MemberPlan />
      <MemberFooter />

    </>
    );
}  