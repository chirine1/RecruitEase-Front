
import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Profile || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const MyProfilePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyProfile />
    </>
  );
};

export default MyProfilePage
