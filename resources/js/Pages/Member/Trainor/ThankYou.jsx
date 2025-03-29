import React from 'react';

import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

import LoggedInMemberTrainorSuccess from '@/Components/LoggedInMember/TrainorSuccess';

 
export default function TrainorThankYou() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <LoggedInMemberTrainorSuccess />
      <LoggedInMemberFooter />

    </>
    );
}  