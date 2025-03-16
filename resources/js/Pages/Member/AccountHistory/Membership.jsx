import React from 'react';

import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

import LoggedInMemberAccountHistoryMembership from '@/Components/LoggedInMember/AccountHistoryMembership';

 
export default function AccountHistoryMembershipPage() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <LoggedInMemberAccountHistoryMembership />
      <LoggedInMemberFooter />

    </>
    );
}  