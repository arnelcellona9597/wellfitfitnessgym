import React from 'react';
import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

import LoggedInMemberAccountHistory from '@/Components/LoggedInMember/AccountHistory';

export default function AccountHistory() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <LoggedInMemberAccountHistory />
      <LoggedInMemberFooter />

    </>
    );
}  