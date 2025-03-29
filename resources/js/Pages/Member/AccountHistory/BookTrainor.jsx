import React from 'react';

import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

import LoggedInMemberAccountHistoryBookTrainor from '@/Components/LoggedInMember/AccountHistoryBookTrainor';

 
export default function AccountHistoryBookTrainorPage() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <LoggedInMemberAccountHistoryBookTrainor />
      <LoggedInMemberFooter />

    </>
    );
}  