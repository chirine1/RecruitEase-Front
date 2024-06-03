const InfoBox = () => {
    return (
      <div className="info-box">
        <div className="left-column">
          <div className="info">
            <h6>Invoice date:</h6>
            <span>03/01/2024</span>
          </div>
  
          <div className="info">
            <h4>Supplier</h4>
          <h5>RecruitEase LLC</h5>
            <p>...</p>
          </div>
        </div>
  
        <div className="right-column">
          <div className="info">
            <h6>Due date:</h6>
            <span>03/01/2024</span>
          </div>
  
          <div className="info">
            <h4>Customer</h4>
            <h5>mohamed</h5>
            <p>Campus Universitaire BP 05 Mahdia - 5111 Mahdia , Tunisia</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default InfoBox;
  