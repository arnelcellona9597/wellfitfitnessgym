import React from 'react';

import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

import LoggedInMemberTrainorForm from '@/Components/LoggedInMember/TrainorForm';



export default function TrainorForm() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <LoggedInMemberTrainorForm />
      <LoggedInMemberFooter />

    </>
    );
}  