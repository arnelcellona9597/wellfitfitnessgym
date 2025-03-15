import React from 'react';

import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

import LoggedInMemberPlanSuccess from '@/Components/LoggedInMember/PlanSuccess';

 
export default function PlanThankYou() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <LoggedInMemberPlanSuccess />
      <LoggedInMemberFooter />

    </>
    );
}  