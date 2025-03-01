import React from 'react';

import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

import LoggedInMemberMembershipForm from '@/Components/LoggedInMember/MembershipForm';



export default function PlanForm() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
 
      <LoggedInMemberMembershipForm />
      <LoggedInMemberFooter />

    </>
    );
}  