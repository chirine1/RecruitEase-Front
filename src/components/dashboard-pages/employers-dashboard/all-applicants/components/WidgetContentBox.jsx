

import candidatesData from "../../../../../data/candidates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";


const WidgetContentBox = () => {
  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>Senior Product Designer</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals"> Total(s): 6</Tab>
              <Tab className="tab-btn approved"> Approved: 2</Tab>
              <Tab className="tab-btn rejected"> Rejected(s): 4</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            
            {/* End total applicants */}

            
            {/* End approved applicants */}

            
            {/* End rejected applicants */}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
