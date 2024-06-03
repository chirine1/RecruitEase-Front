import Map from "../../../Map";

const ContactInfoBox = () => {
    return (
        <form className="default-form">
            <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Country</label>
                    <input
                        type="text"
                        name="name"
                        placeholder=""
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>City</label>
                    <input
                        type="text"
                        name="name"
                        placeholder=""
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>Complete Address</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Campus Universitaire BP 05 -5111 Mahdia, Tunisia.."
                        required
                    />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Campus Universitaire BP 05 -5111 Mahdia, Tunisia.."
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                {/* <div className="form-group col-lg-6 col-md-12">
                    <label>Find On Map</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Campus Universitaire BP 05 -5111 Mahdia, Tunisia."
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Campus Universitaire BP 05 -5111 Mahdia, Tunisia."
                        required
                    />
                </div> */}

                

                {/* <!-- Input --> */}
                {/* <div className="form-group col-lg-12 col-md-12">
                    <button className="theme-btn btn-style-three">
                        Search Location
                    </button>
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <div className="map-outer">
                        <div style={{ height: "420px", width: "100%" }}>
                            <Map />
                        </div>
                    </div>
                </div> */}
                {/* End MapBox */}

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <button type="submit" className="theme-btn btn-style-one">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactInfoBox;
