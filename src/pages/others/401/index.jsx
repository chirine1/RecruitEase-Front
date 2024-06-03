import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Not Authorized || RecruitEase - Job Board",
  description: "You are not authorized to view this page.",
};

const NotAuthorizedPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div
        className="error-page-wrapper"
        style={{
          backgroundImage: `url(/images/404.jpg)`,
        }}
        data-aos="fade"
      >
        <div className="content">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="brand" />
            </Link>
          </div>
          {/* End logo */}

          <h1>401!</h1>
          <p>You are not authorized to view this page.</p>

          <Link className="theme-btn btn-style-three call-modal" to="/">
            BACK TO HOME
          </Link>
        </div>
        {/* End .content */}
      </div>
    </>
  );
};

export default NotAuthorizedPage;
