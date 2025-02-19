import React from 'react';

import MemberHead from '@/Components/Member/Head';


import MemberFacilities from '@/Components/Member/Facilities';
import MemberWhyChooseUs from '@/Components/Member/WhyChooseUs';
import MemberGallery from '@/Components/Member/Gallery';


import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';
import LoggedInMemberMainBanner from '@/Components/LoggedInMember/MainBanner';
import LoggedInMemberPlan from '@/Components/LoggedInMember/Plan';
import LoggedInMemberTrainor from '@/Components/LoggedInMember/Trainor';
import LoggedInMemberGetInTouch from '@/Components/LoggedInMember/GetInTouch';


export default function Index() {
    return (
    <>
      <MemberHead />
      <LoggedInMemberHeader />
      <LoggedInMemberMainBanner />
      
      <LoggedInMemberPlan />
      <MemberGallery />
      <MemberFacilities />
      <MemberWhyChooseUs />
      <LoggedInMemberTrainor/>
      <LoggedInMemberGetInTouch />

      <LoggedInMemberFooter />
    </>
    );
} 