
import AdminDashboard from "@/components/dashboard-pages/admins-dashboard";


import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "admins Dashboard || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const AdminDashboardPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <AdminDashboard/>
    </>
  );
};

export default AdminDashboardPage
