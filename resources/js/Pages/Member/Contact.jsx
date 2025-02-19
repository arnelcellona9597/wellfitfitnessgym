import React from 'react';
import MemberHead from '@/Components/Member/Head';
import MemberContactBanner from '@/Components/Member/ContactBanner';
import MemberContactForm from '@/Components/Member/ContactForm';

import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';


export default function Contact() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />

      <MemberContactBanner />
      <MemberContactForm />

      <LoggedInMemberFooter />

    </>
    );
}  