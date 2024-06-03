

import Faq from "@/components/pages-menu/faq";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Faq || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const FaqPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Faq />
    </>
  );
};

export default FaqPage
