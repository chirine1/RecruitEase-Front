


import MetaComponent from "@/components/common/MetaComponent";
import ResetPassword from "@/components/pages-menu/reset-password";
const metadata = {
  title: 'confirm email || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const ResetPasswordPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ResetPassword/>
    </>
  );
};

export default ResetPasswordPage
