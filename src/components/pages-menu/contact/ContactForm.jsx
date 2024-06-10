import React, { useState } from "react";
import { axiosPrivate } from "@/axios/axios";
import axios from "@/axios/axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/message/contact_admin",
        formData
      );

      await axios.post("/notif/admin", { content: "New Message" });
      toast.success("admin contacted successsfully");
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("failed to send ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12 col-sm-12">
          <div className="response">{responseMessage}</div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            className="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Your Message</label>
          <textarea
            name="content"
            placeholder="Write your message..."
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            id="submit"
            name="submit-form"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
