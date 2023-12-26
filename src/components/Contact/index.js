import React, { useState } from 'react';
import './style.css'

const Contact = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmited = () => {
    setIsFormSubmitted(true)
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 2000);
  };


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  // const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // setIsSubmissionSuccessful(false)
    e.preventDefault();
    const validationErrors = validateForm();
    // console.log('validationErrors lenth', Object.keys(validationErrors).length === 0)
    if (Object.keys(validationErrors).length === 0) {
      // setSubmitted(true);
      setErrors({});
      resetForm();
      sendFormEmail();
    } else {
      setErrors(validationErrors);

    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      validationErrors.phone = 'Phone number is required';
    }
    if (!formData.subject) {
      validationErrors.subject = 'Subject is required';
    }
    if (!formData.message) {
      validationErrors.message = 'Message is required';
    }
    return validationErrors;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };


  const sendFormEmail = () => {
    const emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    fetch('https://formspree.io/f/xbjenkbr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => {
        if (response.ok) {
          handleSubmited()
          console.log('Email sent successfully');
          // Reset the form after successful submission

          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          });
        } else {
          alert('Failed to send email');
        }
      })
      .catch((error) => {
        console.log('Error sending email:', error);
      });
  };

  return (
    <div className="main">
      <h2 className="contact">
        <h1>Contact</h1>
        <p>Feel free to reach out to me for any questions or opportunities!</p>
      </h2>
      <div className="form_div">
        <h2 className="text">Contact Me</h2>

        <div className="form_box">

          <form className="form " onSubmit={handleSubmit}>
            {isFormSubmitted && (
              <p className="submitted_form ">Form submitted successfully!</p>
            )}


            {/* <div className=''> */}

            <div className=" ">
              <label htmlFor="name" className="block font-medium ">
                {/* Name */}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}

              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium ">
                {/* Email */}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='email'
                value={formData.email}
                onChange={handleChange}

              />
              {errors.email && <p className="text-red-500 text-sm ">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium ">
                {/* Phone Number */}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder='Phone Number'
                value={formData.phone}
                onChange={handleChange}

              />
              {errors.phone && <p className="text-red-500 text-sm ">{errors.phone}</p>}
            </div>
            <div className="">
              <label htmlFor="subject" className="block font-medium ">
                {/* Subject */}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder='Subject'
                value={formData.subject}
                onChange={handleChange}

              />
              {errors.subject && <p className="text-red-500 text-sm ">{errors.subject}</p>}
            </div>
            {/* </div> */}

            <div className="">
              <label htmlFor="message" className="block font-medium">
                {/* Message */}
              </label>
              <textarea
                id="message"
                name="message"
                placeholder='Your message Write hare'
                value={formData.message}
                onChange={handleChange}
                // className={`w-full p-2  border ${errors.message ? 'border-red-500' : 'border-gray-300'
                //     } rounded`}
                rows={5}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm ">{errors.message}</p>}
            </div>
            <button
              // onClick={handleSubmited}
              type="submit"
              className="submit"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
