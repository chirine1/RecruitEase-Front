

import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Contact || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const ContactPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Contact />
    </>
  );
};

export default ContactPage
