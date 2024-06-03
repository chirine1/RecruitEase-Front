import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const pricingCotent = [
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

  return (
    <div className="pricing-tabs tabs-box wow fadeInUp">
      {/* <!--Tabs Container--> */}
      <div className="row">
        {pricingCotent.map((item) => (
          <div
            className={`pricing-table col-lg-4 col-md-6 col-sm-12 ${item.tag}`}
            key={item.id}
          >
            <div className="inner-box">
              {item.tag ? (
                <>
                  <span className="tag">Recommended</span>
                </>
              ) : (
                ""
              )}

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
              <Link
                  to={`/employers-dashboard/checkout/${item.packageType}`}
                  className="theme-btn btn-style-three"
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
