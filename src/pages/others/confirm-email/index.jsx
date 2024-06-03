


import MetaComponent from "@/components/common/MetaComponent";
import ConfirmEmail from "@/components/pages-menu/confirm-email";
const metadata = {
  title: 'confirm email || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const ConfirmEmailPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ConfirmEmail/>
    </>
  );
};

export default ConfirmEmailPage
