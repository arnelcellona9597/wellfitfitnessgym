import React from 'react';
import MemberHead from '@/Components/Member/Head';
 
import AboutBanner from '@/Components/Member/AboutBanner';
import MemberWhyChooseUs from '@/Components/Member/WhyChooseUs';
 
import MemberAboutWhatWeHaveDone from '@/Components/Member/AboutWhatWeHaveDone';


import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

export default function About() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <AboutBanner />
      <MemberWhyChooseUs />
      <MemberAboutWhatWeHaveDone />
      <LoggedInMemberFooter />


    </>
    );
}  