
import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Short ListedJobs ||  RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",};

const ShortListedJobsPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShortListedJobs />
    </>
  );
};

export default ShortListedJobsPage
