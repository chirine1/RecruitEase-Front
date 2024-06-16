import MobileMenu from "@/components/header/MobileMenu";

import CandidateCustomHeader from "@/components/header/candidate-custom";
import MultipleChoiceTest from "./test";
const TestPageCandidate = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <CandidateCustomHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <div
        style={{
          
          marginTop: "50px",
        }}
      >
        <div
          /* className="page-wrapper dashboard" */ style={{
            marginLeft: "200px",
            marginRight: "200px",
          }}
        >
          <MultipleChoiceTest />
        </div>
      </div>
    </>
  );
};

export default TestPageCandidate;
