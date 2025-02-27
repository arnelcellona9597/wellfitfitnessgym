import React from 'react';
import MemberHead from '@/Components/Member/Head';
 
import MemberProfileBanner from '@/Components/Member/ProfileBanner';
 
 

import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';
import LoggedInMemberProfile from '@/Components/LoggedInMember/Profile';


export default function Plans() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <MemberProfileBanner />
      <LoggedInMemberProfile/>
      <LoggedInMemberFooter />

    </>
    );
}  