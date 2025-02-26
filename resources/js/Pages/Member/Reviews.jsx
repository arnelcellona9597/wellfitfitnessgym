import React from 'react';
import MemberHead from '@/Components/Member/Head';
 
import MemberReviewsBanner from '@/Components/Member/ReviewsBanner';


import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';
import LoggedInMemberReviews from '@/Components/LoggedInMember/Reviews';


export default function Reviews() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <MemberReviewsBanner />
      <LoggedInMemberReviews />
      <LoggedInMemberFooter />

    </>
    );
}  