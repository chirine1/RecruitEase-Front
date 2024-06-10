


import MetaComponent from "@/components/common/MetaComponent";
import ForgotPassword from "@/components/pages-menu/forgot-password";
const metadata = {
  title: 'confirm email || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const ForgotPasswordPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ForgotPassword/>
    </>
  );
};

export default ForgotPasswordPage
