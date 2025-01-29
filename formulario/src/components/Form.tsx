import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

interface FormProps {
  initialValues?: {
    subject: string;
    gender: string;
    department: string;
    message: string;
    firstName: string;
    lastName: string;
    postalCode: string;
    city: string;
    street: string;
    email: string;
    telephone: string;
    terms: boolean;
  };
}

const Form = ({ initialValues }: FormProps) => {
  const messageRef = useRef<HTMLDivElement>(null); // Ref to focus on message container
  const formik = useFormik({
    initialValues: initialValues || {
      subject: "",
      gender: "",
      department: "",
      message: "",
      firstName: "",
      lastName: "",
      postalCode: "",
      city: "",
      street: "",
      email: "",
      telephone: "",
      terms: false,
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Subject is required"),
      gender: Yup.string().required("Gender is required"),
      department: Yup.string().required("Please select a department"),
      message: Yup.string().required("Message is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      postalCode: Yup.string()
        .matches(/^\d{4}$/, "Postal code must be a 4-digit number")
        .required("Postal code is required"),
      city: Yup.string().required("City is required"),
      street: Yup.string().required("Street is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      telephone: Yup.string()
      .matches(/^\+?\d+$/, "Telephone must contain only numbers")
      .required("Telephone is required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    }),
    onSubmit: (_values, { setSubmitting, resetForm }) => {
      // Simulate a successful submission (e.g., API call)
      setTimeout(() => {
        // Provide success feedback in the same aria-live region
        if (messageRef.current) {
          messageRef.current.textContent = "Your form has been successfully submitted.";
          messageRef.current.focus();
        }
        // Reset or do whatever you need after submission
        resetForm();
        setSubmitting(false);
      }, 500);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to display validation errors
    formik.setTouched({
      subject: true,
      gender: true,
      department: true,
      message: true,
      firstName: true,
      lastName: true,
      postalCode: true,
      city: true,
      street: true,
      email: true,
      telephone: true,
      terms: true,
    });

    // Validate the form
    const errors = await formik.validateForm();

    // If there are errors, display them in the live region
    if (Object.keys(errors).length > 0) {
      const errorList = Object.values(errors).join(", ");
      if (messageRef.current) {
        messageRef.current.textContent = `The form contains errors: ${errorList}`;
        messageRef.current.focus();
      }
      return;
    }

    // If no errors, clear any existing message and submit
    if (messageRef.current) {
      messageRef.current.textContent = "";
    }

    // Proceed with form submission
    formik.handleSubmit();
  };

  return (
    <main
      role="main"
      className="main-content flex justify-center items-center min-h-screen bg-gray-200"
    >
      <form className="form" onSubmit={handleSubmit} noValidate role="form">
        <h1>Contact Form</h1>

        {/* Live region for both error and success messages */}
        <div
          id="form-message"
          ref={messageRef}
          tabIndex={-1}
          aria-live="assertive"
          className="mb-4 text-lg font-semibold text-green-700 bg-green-50 p-2"
        ></div>

        {/* Gender Selection */}
        <div className="gender-group">
          <fieldset>
            <legend>Gender</legend>
            <label htmlFor="gender-man">
              Man
              <input
                id="gender-man"
                type="radio"
                name="gender"
                value="man"
                checked={formik.values.gender === "man"}
                onChange={formik.handleChange}
              />
            </label>
            <label htmlFor="gender-woman">
              Woman
              <input
                id="gender-woman"
                type="radio"
                name="gender"
                value="woman"
                checked={formik.values.gender === "woman"}
                onChange={formik.handleChange}
              />
            </label>
            <label htmlFor="gender-other">
              Other
              <input
                id="gender-other"
                type="radio"
                name="gender"
                value="other"
                checked={formik.values.gender === "other"}
                onChange={formik.handleChange}
              />
            </label>
          </fieldset>
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            {...formik.getFieldProps("subject")}
            aria-describedby="subject-error"
          />
          {formik.touched.subject && formik.errors.subject && (
            <div
              className="error-message"
              id="subject-error"
              aria-live="assertive"
            >
              {formik.errors.subject}
            </div>
          )}
        </div>

        {/* Department */}
        <div className="mb-4">
          <label htmlFor="department">Select a Department</label>
          <select
            id="department"
            {...formik.getFieldProps("department")}
            aria-describedby="department-error"
          >
            <option value="">-- Select Department --</option>
            <option value="health">Health Department</option>
            <option value="education">Education Department</option>
            <option value="transport">Transport Department</option>
            <option value="immigration">Immigration Office</option>
          </select>
          {formik.touched.department && formik.errors.department && (
            <div
              className="error-message"
              id="department-error"
              aria-live="assertive"
            >
              {formik.errors.department}
            </div>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...formik.getFieldProps("message")}
            aria-describedby="message-error"
          />
          {formik.touched.message && formik.errors.message && (
            <div
              className="error-message"
              id="message-error"
              aria-live="assertive"
            >
              {formik.errors.message}
            </div>
          )}
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...formik.getFieldProps("firstName")}
            aria-describedby="firstName-error"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div
              className="error-message"
              id="firstName-error"
              aria-live="assertive"
            >
              {formik.errors.firstName}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...formik.getFieldProps("lastName")}
            aria-describedby="lastName-error"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div
              className="error-message"
              id="lastName-error"
              aria-live="assertive"
            >
              {formik.errors.lastName}
            </div>
          )}
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            {...formik.getFieldProps("postalCode")}
            aria-describedby="postalCode-error"
          />
          {formik.touched.postalCode && formik.errors.postalCode && (
            <div
              className="error-message"
              id="postalCode-error"
              aria-live="assertive"
            >
              {formik.errors.postalCode}
            </div>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            {...formik.getFieldProps("city")}
            aria-describedby="city-error"
          />
          {formik.touched.city && formik.errors.city && (
            <div
              className="error-message"
              id="city-error"
              aria-live="assertive"
            >
              {formik.errors.city}
            </div>
          )}
        </div>

        {/* Street */}
        <div className="mb-4">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            {...formik.getFieldProps("street")}
            aria-describedby="street-error"
          />
          {formik.touched.street && formik.errors.street && (
            <div
              className="error-message"
              id="street-error"
              aria-live="assertive"
            >
              {formik.errors.street}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            aria-describedby="email-error"
          />
          {formik.touched.email && formik.errors.email && (
            <div
              className="error-message"
              id="email-error"
              aria-live="assertive"
            >
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Telephone */}
        <div className="mb-4">
          <label htmlFor="telephone">Telephone</label>
          <input
            id="telephone"
            type="text"
            {...formik.getFieldProps("telephone")}
            aria-describedby="telephone-error"
          />
          {formik.touched.telephone && formik.errors.telephone && (
            <div
              className="error-message"
              id="telephone-error"
              aria-live="assertive"
            >
              {formik.errors.telephone}
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              {...formik.getFieldProps("terms")}
              aria-describedby="terms-error"
            />
            I agree to the terms and conditions
          </label>
          {formik.touched.terms && formik.errors.terms && (
            <div
              className="error-message"
              id="terms-error"
              aria-live="assertive"
            >
              {formik.errors.terms}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formik.isValid || formik.isSubmitting}
          style={{ backgroundColor: "#0056b3", color: "#ffffff" }}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Form;
