import React from 'react';

import MemberHead from '@/Components/Member/Head';
import MemberPlansBanner from '@/Components/Member/PlansBanner';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';
import LoggedInMemberPlan from '@/Components/LoggedInMember/Plan';


export default function Plans() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <MemberPlansBanner />
      <LoggedInMemberPlan />
      <LoggedInMemberFooter />

    </>
    );
}  