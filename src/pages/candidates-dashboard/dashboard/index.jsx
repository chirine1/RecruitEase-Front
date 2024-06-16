
import DashboadHome from "@/components/dashboard-pages/candidates-dashboard/dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Candidates Dashboard || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const DashboardPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardPage
