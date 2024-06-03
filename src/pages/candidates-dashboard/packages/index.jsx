
import Packages from "@/components/dashboard-pages/candidates-dashboard/packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const PackagePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Packages />
    </>
  );
};

export default PackagePage
