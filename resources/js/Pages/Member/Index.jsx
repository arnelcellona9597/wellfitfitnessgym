import React from 'react';
import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import MemberMainBanner from '@/Components/Member/MainBanner';
import MemberPlan from '@/Components/Member/Plan';
import MemberFacilities from '@/Components/Member/Facilities';
import MemberWhyChooseUs from '@/Components/Member/WhyChooseUs';
import MemberGallery from '@/Components/Member/Gallery';
import MemberTrainor from '@/Components/Member/Trainor';
import MemberFooter from '@/Components/Member/Footer';
import MemberGetInTouch from '@/Components/Member/GetInTouch';


export default function Index() {
    return (
    <>
      <MemberHead />
      <LoggedInMemberHeader />
      <MemberMainBanner />
      <MemberPlan />
      <MemberGallery />
      <MemberFacilities />
      <MemberWhyChooseUs />
      <MemberTrainor/>
      <MemberGetInTouch />
      <MemberFooter />
    </>
    );
} 