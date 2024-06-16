import Wrapper from "@/layout/Wrapper";
import HomeComponent from "@/components/home";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home || RecruitEase - Job Borad ",
  description: "RecruitEase - simplifying Hiring with AI",
};

export default function Home() {
  return (
    <Wrapper >
    <MetaComponent meta={metadata} />
      <HomeComponent />
    </Wrapper>
  );
}
