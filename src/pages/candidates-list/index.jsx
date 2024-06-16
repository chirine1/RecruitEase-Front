

import CandidatesList from "@/components/candidates-listing-pages/candidates-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Candidates List  || ReactEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}


const CandidateListPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <CandidatesList />
    </>
  );
};

export default CandidateListPage
