import React from 'react';
import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import PrivacyPolicyBanner from '@/Components/LoggedInMember/PrivacyPolicyBanner';
import PrivacyPolicyContent from '@/Components/LoggedInMember/PrivacyPolicyContent';

import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

export default function PrivacyPolicy() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <PrivacyPolicyBanner />
      <PrivacyPolicyContent />
      <LoggedInMemberFooter />
    </>
    );
}  