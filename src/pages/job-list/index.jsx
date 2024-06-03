
import JobList from "@/components/job-listing-pages/job-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List  || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad e",
};

const JobListPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage
