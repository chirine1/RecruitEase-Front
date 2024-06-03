
import Messages from "@/components/dashboard-pages/candidates-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const MessageesPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Messages />
    </>
  );
};

export default MessageesPage
