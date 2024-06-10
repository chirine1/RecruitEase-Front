import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosPrivate } from '@/axios/axios';
import { toast } from 'react-toastify';

const CommentForm = ({ id, addComment }) => {  // Accept addComment as a prop
  const initialValues = {
    message: '',
  };

  const validationSchema = Yup.object({
    message: Yup.string()
      .required('Message is required')
      .min(20, 'Message should be at least 20 characters long')
      .max(200, 'Message should be at most 200 characters long'),
  });

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    axiosPrivate.post('/comment', { content: values.message, blog_post_id: id })
      .then(response => {
        setStatus({ success: true });
        resetForm();
        toast.success("Comment posted successfully");
        addComment(response.data);  // Update comments in the parent component
      })
      .catch(error => {
        setStatus({ success: false });
        toast.error("Failed to post comment");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => onSubmit(values, actions),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12 col-sm-12">
          {formik.status && formik.status.success === true && (
            <div className="response success">Comment submitted successfully</div>
          )}
          {formik.status && formik.status.success === false && (
            <div className="response error">Error submitting comment</div>
          )}
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Your Message</label>
          <textarea
            name="message"
            placeholder="Write your message..."
            className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-danger">{formik.errors.message}</div>
          ) : null}
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Comment'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
