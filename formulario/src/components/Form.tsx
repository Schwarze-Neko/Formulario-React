import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
  const formik = useFormik({
    initialValues: {
      subject: '',
      gender: '',
      department: '',
      message: '',
      firstName: '',
      lastName: '',
      postalCode: '',
      city: '',
      street: '',
      email: '',
      telephone: '',
      terms: false,
    },
    validationSchema: Yup.object({
      subject: Yup.string().required('Subject is required'),
      gender: Yup.string().required('Gender is required'),
      department: Yup.string().required('Department is required'),
      message: Yup.string().required('Message is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      postalCode: Yup.string()
        .matches(/^\d{5}$/, 'Postal code must be a 5-digit number')
        .required('Postal code is required'),
      city: Yup.string().required('City is required'),
      street: Yup.string().required('Street is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      telephone: Yup.string()
        .matches(/^\d+$/, 'Telephone must contain only numbers')
        .required('Telephone is required'),
      terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
        role="form" 
      >
        <h1>Contact Form</h1>

        {/* Gender Selection */}
        <div className="gender-group mb-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="man"
              checked={formik.values.gender === 'man'}
              onChange={formik.handleChange}
              aria-label="Select gender as man"
              aria-required="true"
              aria-describedby={formik.errors.gender ? 'gender-error' : undefined}
            />
            Man
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="woman"
              checked={formik.values.gender === 'woman'}
              onChange={formik.handleChange}
              aria-label="Select gender as woman"
              aria-required="true"
              aria-describedby={formik.errors.gender ? 'gender-error' : undefined}
            />
            Woman
          </label>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="error-message" id="gender-error">
              {formik.errors.gender}
            </div>
          ) : null}
        </div>

        {/* Subject Field */}
        <div className="mb-4">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            {...formik.getFieldProps('subject')}
            aria-label="Enter the subject of your message"
            aria-required="true"
            aria-describedby={formik.errors.subject ? 'subject-error' : undefined}
          />
          {formik.touched.subject && formik.errors.subject ? (
            <div className="error-message" id="subject-error">
              {formik.errors.subject}
            </div>
          ) : null}
        </div>

        {/* Department Field */}
        <div className="mb-4">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            type="text"
            {...formik.getFieldProps('department')}
            aria-label="Enter the department related to your query"
            aria-required="true"
            aria-describedby={formik.errors.department ? 'department-error' : undefined}
          />
          {formik.touched.department && formik.errors.department ? (
            <div className="error-message" id="department-error">
              {formik.errors.department}
            </div>
          ) : null}
        </div>

        {/* Message Field */}
        <div className="mb-4">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...formik.getFieldProps('message')}
            aria-label="Enter your message"
            aria-required="true"
            aria-describedby={formik.errors.message ? 'message-error' : undefined}
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <div className="error-message" id="message-error">
              {formik.errors.message}
            </div>
          ) : null}
        </div>

        {/* First Name Field */}
        <div className="mb-4">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...formik.getFieldProps('firstName')}
            aria-label="Enter your first name"
            aria-required="true"
            aria-describedby={formik.errors.firstName ? 'firstName-error' : undefined}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error-message" id="firstName-error">
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>

        {/* Last Name Field */}
        <div className="mb-4">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...formik.getFieldProps('lastName')}
            aria-label="Enter your last name"
            aria-required="true"
            aria-describedby={formik.errors.lastName ? 'lastName-error' : undefined}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error-message" id="lastName-error">
              {formik.errors.lastName}
            </div>
          ) : null}
        </div>

        {/* Postal Code Field */}
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            {...formik.getFieldProps('postalCode')}
            aria-label="Enter your postal code"
            aria-required="true"
            aria-describedby={formik.errors.postalCode ? 'postalCode-error' : undefined}
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div className="error-message" id="postalCode-error">
              {formik.errors.postalCode}
            </div>
          ) : null}
        </div>

        {/* City Field */}
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            {...formik.getFieldProps('city')}
            aria-label="Enter your city"
            aria-required="true"
            aria-describedby={formik.errors.city ? 'city-error' : undefined}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="error-message" id="city-error">
              {formik.errors.city}
            </div>
          ) : null}
        </div>

        {/* Street Field */}
        <div className="mb-4">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            {...formik.getFieldProps('street')}
            aria-label="Enter your street"
            aria-required="true"
            aria-describedby={formik.errors.street ? 'street-error' : undefined}
          />
          {formik.touched.street && formik.errors.street ? (
            <div className="error-message" id="street-error">
              {formik.errors.street}
            </div>
          ) : null}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            aria-label="Enter your email address"
            aria-required="true"
            aria-describedby={formik.errors.email ? 'email-error' : undefined}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message" id="email-error">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        {/* Telephone Field */}
        <div className="mb-4">
          <label htmlFor="telephone">Telephone</label>
          <input
            id="telephone"
            type="text"
            {...formik.getFieldProps('telephone')}
            aria-label="Enter your telephone number"
            aria-required="true"
            aria-describedby={formik.errors.telephone ? 'telephone-error' : undefined}
          />
          {formik.touched.telephone && formik.errors.telephone ? (
            <div className="error-message" id="telephone-error">
              {formik.errors.telephone}
            </div>
          ) : null}
        </div>

        {/* Terms Checkbox */}
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              {...formik.getFieldProps('terms')}
              aria-label="Accept terms and conditions"
              aria-required="true"
              aria-describedby={formik.errors.terms ? 'terms-error' : undefined}
            />
            I agree to the terms and conditions
          </label>
          {formik.touched.terms && formik.errors.terms ? (
            <div className="error-message" id="terms-error">
              {formik.errors.terms}
            </div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
