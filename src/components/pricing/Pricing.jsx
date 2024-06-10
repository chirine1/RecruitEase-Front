import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate"; // Assuming this is the correct import for your axios hook

const Pricing = () => {
  const [currentPackage, setCurrentPackage] = useState(null);
  const { axiosPrivate } = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyPackage = async () => {
      try {
        const response = await axiosPrivate.get("/company/current");
        setCurrentPackage(response.data.package);
      } catch (error) {
        console.error("Failed to fetch company package", error);
      }
    };

    fetchCompanyPackage();
  }, [axiosPrivate]);

  const pricingContent = [
    {
      id: 1,
      packageType: "Free",
      price: "0",
      tag: "",
      features: [
        "10 job posting",
        "Job displayed for 15 days",
        "Premium Support 24/7",
      ],
    },
    {
      id: 2,
      packageType: "Standard",
      price: "299",
      tag: "tagged",
      features: [
        "30 job posting",
        "Job displayed for 20 days",
        "Premium Support 24/7",
      ],
    },
    {
      id: 3,
      packageType: "Extended",
      price: "599",
      tag: "",
      features: [
        "60 job posting",
        "Job displayed for 60 days",
        "Premium Support 24/7",
      ],
    },
  ];

  const handleSubscribe = (packageType) => {
    if (packageType === "Free") {
      // Perform any action needed for free package, e.g., show a confirmation message
      
    } else {
      // Redirect to the payment page for other packages
      navigate(`/employers-dashboard/checkout/${packageType}`);
    }
  };

  return (
    <div className="pricing-tabs tabs-box wow fadeInUp">
      {currentPackage && currentPackage.label !== "Free" ? (
        <div className="current-plan-message">
          <h3>You have already purchased a plan: {currentPackage.label}</h3>
        </div>
      ) : (
        <div className="row">
          {pricingContent.map((item) => (
            <div
              className={`pricing-table col-lg-4 col-md-6 col-sm-12 ${item.tag}`}
              key={item.id}
            >
              <div className="inner-box">
                {item.tag && <span className="tag">Recommended</span>}

                <div className="title">{item.packageType}</div>
                <div className="price">
                  ${item.price} <span className="duration">/ monthly</span>
                </div>
                <div className="table-content">
                  <ul>
                    {item.features.map((feature, i) => (
                      <li key={i}>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="table-footer">
                  <button
                    onClick={() => handleSubscribe(item.packageType)}
                    className="theme-btn btn-style-three"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pricing;
