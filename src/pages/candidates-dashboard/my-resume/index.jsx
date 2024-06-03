
import MyResume from "@/components/dashboard-pages/candidates-dashboard/my-resume";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My resumes || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const MyResumePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyResume />
    </>
  );
};

export default MyResumePage
