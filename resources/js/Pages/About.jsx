import React from 'react';
import MemberHead from '@/Components/Member/Head';
import MemberHeader from '@/Components/Member/Header';
import AboutBanner from '@/Components/Member/AboutBanner';
import MemberWhyChooseUs from '@/Components/Member/WhyChooseUs';
import MemberFooter from '@/Components/Member/Footer';
import MemberAboutWhatWeHaveDone from '@/Components/Member/AboutWhatWeHaveDone';

export default function About() {
    return (
    <>
    
      <MemberHead />
      <MemberHeader />
      <AboutBanner />
      <MemberWhyChooseUs />
      <MemberAboutWhatWeHaveDone />
      <MemberFooter />

    </>
    );
}  