import MobileMenu from "@/components/header/MobileMenu";
import AdminHeader from "../../header";
import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import SocialNetworkBox from "@/components/dashboard-pages/candidates-dashboard/my-profile/components/SocialNetworkBox";
import ContactInfoBox from "@/components/dashboard-pages/candidates-dashboard/my-profile/components/ContactInfoBox";
import SkillsTable from "./list";
import AdminSidebar from "@/components/header/AdminSidebar";


const SkillsPageAdmin = () => {
    return (
        <div className="page-wrapper dashboard">
            <span className="header-span"></span>
            {/* <!-- Header Span for hight --> */}

           
            <AdminHeader/>
            
            {/* End Header */}

            <MobileMenu />
            {/* End MobileMenu */}

           <AdminSidebar/>
            {/* <!-- End User Sidebar Menu --> */}

            {/* <!-- Dashboard --> */}
            <section className="user-dashboard">
                <div className="dashboard-outer">
                    <BreadCrumb title="Manage Skills" />
                    {/* breadCrumb */}

                    <MenuToggler />
                    {/* Collapsible sidebar button */}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ls-widget">
                                <div className="tabs-box">
                                    
                                 <SkillsTable/>
                                </div>
                            </div>
                            {/* <!-- Ls widget --> */}

                           
                            
                            {/* <!-- Ls widget --> */}
                        </div>
                    </div>
                    {/* End .row */}
                </div>
                {/* End dashboard-outer */}
            </section>
            {/* <!-- End Dashboard --> */}

         
            {/* <!-- End Copyright --> */}
        </div>
        // End page-wrapper
    );
};

export default SkillsPageAdmin;
