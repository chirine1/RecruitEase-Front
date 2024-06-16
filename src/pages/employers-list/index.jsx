
import EmployersList from "@/components/employers-listing-pages/employers-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List  ||  RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const EmployerListPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerListPage
