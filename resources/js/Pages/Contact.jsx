import React from 'react';
import MemberHead from '@/Components/Member/Head';
import MemberHeader from '@/Components/Member/Header';
import MemberContactBanner from '@/Components/Member/ContactBanner';
import MemberFooter from '@/Components/Member/Footer';
import MemberContactForm from '@/Components/Member/ContactForm';


export default function Contact() {
    return (
    <>
    
      <MemberHead />
      <MemberHeader />
      <MemberContactBanner />
      <MemberContactForm />
      <MemberFooter />

    </>
    );
}  