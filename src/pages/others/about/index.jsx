

import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'About || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const AboutPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <About />
    </>
  );
};

export default AboutPage
