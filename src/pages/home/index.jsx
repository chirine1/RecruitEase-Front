import React from "react";

import Home from "@/components/home";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home || RecruitEase- Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const HomePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage;
