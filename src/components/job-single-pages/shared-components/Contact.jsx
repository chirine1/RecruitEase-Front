import React from 'react';
import { useFormik } from 'formik';
import { axiosPrivate } from '@/axios/axios';
import { toast } from 'react-toastify';

const Contact = ({ id }) => {
  const formik = useFormik({
    initialValues: {
      subject: '',
      message: '',
    },
    onSubmit: async (values) => {
      const payload = {
        receiver_id: id,
        subject: values.subject,
        content: values.message,
      };

      try {
        const response = await axiosPrivate.post('/message', payload);
        console.log('Success:', response.data);
        toast.success("message sent")
      } catch (error) {
        console.error('Error:', error);
        toast.error("error sending message")
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message"
            required
            onChange={formik.handleChange}
            value={formik.values.message}
          ></textarea>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="submit-form"
          >
            Send Message
          </button>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default Contact;
