import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";

import HomePage from "./pages/home";

import JobListPage from "./pages/job-list";

import JobSingleDynamic from "./pages/job-single";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import EmployerListPage from "./pages/employers-list";

import EmployersSingle from "./pages/employers-single";

import CandidateListPage from "./pages/candidates-list";

import BlogListpage from "./pages/blog/blog-list";

import BlogDetailsDynamic from "./pages/blog/blog-details";
import AboutPage from "./pages/others/about";
import PricingPage from "./pages/others/pricing";
import FaqPage from "./pages/others/faq";
import TermsPage from "./pages/others/terms";
import InvoicePage from "./pages/others/invoice";
import ContactPage from "./pages/others/contact";
import NotFoundPage from "./pages/others/404";
import DashboardEmploeeDBPage from "./pages/employers-dashboard/dashboard";
import CompanyProfileEmploeeDBPage from "./pages/employers-dashboard/company-profile";
import PostJobsEmploeeDBPage from "./pages/employers-dashboard/post-jobs";
import ManageJobsEmploeeDBPage from "./pages/employers-dashboard/manage-jobs";
import AllApplicantsEmploeesPage from "./pages/employers-dashboard/all-applicants";
import ShortListedResumeEmploeeDBPage from "./pages/employers-dashboard/shortlisted-resumes";
import PackageEmploeeDBPage from "./pages/employers-dashboard/packages";
import MessageEmploeeDBPage from "./pages/employers-dashboard/messages";
import ResumeAlertsEmploeeDBPage from "./pages/employers-dashboard/resume-alerts";
import ChangePasswordEmploeeDBPage from "./pages/employers-dashboard/change-password";
import DashboardPage from "./pages/candidates-dashboard/dashboard";
import AppliedJobsPage from "./pages/candidates-dashboard/applied-jobs";
import ChangePasswordPage from "./pages/candidates-dashboard/change-password";

import MyProfilePage from "./pages/candidates-dashboard/my-profile";
import MyResumePage from "./pages/candidates-dashboard/my-resume";
import PackagePage from "./pages/candidates-dashboard/packages";
import ShortListedJobsPage from "./pages/candidates-dashboard/short-listed-jobs";
import LoginPage from "./pages/others/login";
import RegisterPage from "./pages/others/register";
import ShopListPage from "./pages/shop/shop-list";
import ShopSingleDyanmic from "./pages/shop/shop-single";
import CartPage from "./pages/shop/cart";
import CheckoutPage from "./pages/shop/checkout";
import OrderCompletedPage from "./pages/shop/order-completed";
import Extra_candidate_step2 from "./pages/next-steps/candidate/extra_steps_register_candidate_step2";
import Extra_candidate_step3 from "./pages/next-steps/candidate/extra_steps_register_candidate_step3";
import BlogListPageCand from "./pages/blog/blog-list-candidate";
import NotAuthorizedPage from "./pages/others/401";
import ProtectedRoute from "./hooks/protectedRoute";
import ConfirmEmailPage from "./pages/others/confirm-email";
import ForgotPasswordPage from "./pages/others/forgot-password";
import ResetPasswordPage from "./pages/others/reset-password";
import ViewJobEmployerPage from "./pages/employers-dashboard/view_job";
import AdminDashboardPage from "./pages/admin-dashboard/dashboard/admin-dashboard";
import BlogPageAdmin from "./pages/admin-dashboard/blog";
import ManageCandidate from "./pages/admin-dashboard/manage/candidates";
import ManageRecruiters from "./pages/admin-dashboard/manage/recruiters";
import SkillsPageAdmin from "./pages/admin-dashboard/manage/skills";
import IndustriesPageAdmin from "./pages/admin-dashboard/manage/industries";
import PassPageAdmin from "./pages/admin-dashboard/change-password";
import ManageJobs from "./pages/admin-dashboard/manage/jobs";
import JobSingleDynamicAdmin from "./pages/admin-dashboard/manage/jobs/view-job";
import JobSingleDynamicCand from "./pages/candidates-dashboard/job-single";
import ApplicantsPage from "./pages/employers-dashboard/applicants-job";
import PaymentPage from "./pages/employers-dashboard/payment/paymentPage";
import AddBlogPostPageCand from "./components/blog-meu-pages/blog-list-cand/add-post";
import BlogDetailsCandidate from "./pages/blog/blog-details-candidate";
import ContactPageCand from "./pages/candidates-dashboard/contact-admin";
import ContactPageEmployer from "./pages/employers-dashboard/contact-admin";
import EmployersSingleCand from "./pages/candidates-dashboard/employer-single";
import CandidateSingleDynamicEmployer from "./pages/employers-dashboard/candidate-single";
import TestPageCandidate from "./pages/candidates-dashboard/test";
import PaymentPageAdmin from "./pages/admin-dashboard/manage/payment";
import BlogListPageEmployer from "./pages/blog/blog-list-employer";
import BlogDetailsEmployer from "./pages/blog/blog-details-employer";
import BlogListAdmin from "./pages/blog/blog-list-admin";
import BlogDetailsAdmin from "./pages/blog/blog-details-admin";
import AddBlogPostPageEmployer from "./components/blog-meu-pages/blog-list-employer/add-post";
import AddBlogPostPageAdmin from "./components/blog-meu-pages/blog-list-admin/add-post";
import AdminMessages from "./pages/admin-dashboard/messages";
import CandMessages from "./pages/candidates-dashboard/messages";
import BlogListPageGuest from "./pages/blog/blog-list";
import BlogDetailsGuest from "./pages/blog/blog-details";
import CandidateSingleDynamicAdmin from "./pages/admin-dashboard/candidate-single";
import EmployersSingleAdmin from "./pages/admin-dashboard/employer-single";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <div className="page-wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />

              <Route path="home" element={<HomePage />} />

              <Route path="candidates-list" element={<CandidateListPage />} />

              <Route path="job-list" element={<JobListPage />} />

              <Route path="job-single" element={<JobSingleDynamic />} />

              <Route path="employers-list" element={<EmployerListPage />} />

              <Route path="employers-single" element={<EmployersSingle />} />

              <Route path="blog-list" element={<BlogListPageGuest />} />
              <Route path="blog-details/:id" element={<BlogDetailsGuest />} />

              <Route path="about" element={<AboutPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="invoice" element={<InvoicePage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="401" element={<NotAuthorizedPage />} />
              <Route path="confirm-email" element={<ConfirmEmailPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="packages" element={<PackagePage />} />

              <Route
                path="employers-dashboard"
                element={<ProtectedRoute roles={["recruiter"]} />}
              >
                <Route path="dashboard" element={<DashboardEmploeeDBPage />} />
                <Route path="contact" element={<ContactPageEmployer />} />
                <Route
                  path="candidates-single/:id"
                  element={<CandidateSingleDynamicEmployer />}
                />
                <Route
                  path="company-profile"
                  element={<CompanyProfileEmploeeDBPage />}
                />
                <Route path="post-jobs" element={<PostJobsEmploeeDBPage />} />
                <Route
                  path="manage-jobs"
                  element={<ManageJobsEmploeeDBPage />}
                />
                <Route path="job/:jobId" element={<ViewJobEmployerPage />} />
                <Route
                  path="all-applicants"
                  element={<AllApplicantsEmploeesPage />}
                />
                <Route path="applicant/:jobId" element={<ApplicantsPage />} />
                <Route path="packages" element={<PackageEmploeeDBPage />} />
                <Route path="messages" element={<MessageEmploeeDBPage />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordEmploeeDBPage />}
                />
                <Route path="checkout/:label" element={<PaymentPage />} />
                <Route path="blog-list" element={<BlogListPageEmployer />} />
                <Route
                  path="blog-details/:id"
                  element={<BlogDetailsEmployer />}
                />
                <Route
                  path="add-blog-post"
                  element={<AddBlogPostPageEmployer />}
                />
              </Route>

              <Route
                path="candidates-dashboard"
                element={<ProtectedRoute roles={["candidate"]} />}
              >
                <Route path="dashboard" element={<DashboardPage />} />
                <Route
                  path="test/:jobId/:applicationId"
                  element={<TestPageCandidate />}
                />
                <Route path="applied-jobs" element={<AppliedJobsPage />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage />}
                />
                <Route
                  path="employers-single/:id"
                  element={<EmployersSingleCand />}
                />
                <Route path="messages" element={<CandMessages />} />
                <Route path="my-profile" element={<MyProfilePage />} />
                <Route path="my-resume" element={<MyResumePage />} />
                <Route path="find-jobs" element={<JobListPage />} />
                <Route path="add-blog-post" element={<AddBlogPostPageCand />} />
                <Route path="contact" element={<ContactPageCand />} />
                <Route
                  path="find-jobs/:jobId"
                  element={<JobSingleDynamicCand />}
                />
                <Route path="blog-list" element={<BlogListPageCand />} />
                <Route
                  path="blog-details/:id"
                  element={<BlogDetailsCandidate />}
                />
                <Route
                  path="short-listed-jobs"
                  element={<ShortListedJobsPage />}
                />
              </Route>

              <Route path="shop">
                <Route
                  path="order-completed/:label"
                  element={<OrderCompletedPage />}
                />
              </Route>

              <Route
                path="admins-dashboard"
                element={<ProtectedRoute roles={["admin"]} />}
              >
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="blog-list" element={<BlogListAdmin />}>
                  {/*  <Route path=":postId" element={<AdminDashboardPage />} /> */}
                </Route>
                <Route path="manage/candidates" element={<ManageCandidate />} />
                <Route
                  path="manage/recruiters"
                  element={<ManageRecruiters />}
                />
                <Route path="manage/skills" element={<SkillsPageAdmin />} />
                <Route path="manage/payment" element={<PaymentPageAdmin />} />
                <Route
                  path="candidates-single/:id"
                  element={<CandidateSingleDynamicAdmin />}
                />
                <Route
                  path="employers-single/:id"
                  element={<EmployersSingleAdmin />}
                />
                <Route
                  path="manage/job-category"
                  element={<IndustriesPageAdmin />}
                />
                <Route path="change-password" element={<PassPageAdmin />} />
                <Route path="manage/jobs" element={<ManageJobs />} />
                <Route path="jobs/:jobId" element={<JobSingleDynamicAdmin />} />
                <Route path="blog-details/:id" element={<BlogDetailsAdmin />} />
                <Route
                  path="add-blog-post"
                  element={<AddBlogPostPageAdmin />}
                />
              </Route>
            </Route>
          </Routes>
          <ScrollTopBehaviour />

          {/* Toastify */}
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {/* <!-- Scroll To Top --> */}
          <ScrollToTop />
        </div>
      </Provider>
    </>
  );
}

export default App;
