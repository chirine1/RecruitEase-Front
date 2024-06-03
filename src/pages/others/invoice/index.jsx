

import Invoice from "@/components/pages-menu/invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Invoice || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const InvoicePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Invoice />
    </>
  );
};

export default InvoicePage
