import React from 'react';
import MemberHead from '@/Components/Member/Head';
 
import MemberTrainorBanner from '@/Components/Member/TrainorBanner';
 

import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';
import LoggedInMemberTrainor from '@/Components/LoggedInMember/Trainor';

export default function Plans() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <MemberTrainorBanner />
      <LoggedInMemberTrainor />
      <LoggedInMemberFooter />

    </>
    );
}  