import React from 'react';
import MemberHead from '@/Components/Member/Head';
import MemberHeader from '@/Components/Member/Header';
import MemberReviewsBanner from '@/Components/Member/ReviewsBanner';
import MemberFooter from '@/Components/Member/Footer';
import MemberReviews from '@/Components/Member/Reviews';


export default function Plans() {
    return (
    <>
    
      <MemberHead />
      <MemberHeader />
      <MemberReviewsBanner />
      <MemberReviews />
      <MemberFooter />

    </>
    );
}  