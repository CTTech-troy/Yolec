// src/components/form.jsx

import React, { useState } from 'react';
import { database, ref, push } from '../../../firebase'; // adjust if needed
import Swal from 'sweetalert2';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    event: '',
  });

  const [loading, setLoading] = useState(false); // loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📥 Form Data Submitted:', formData);

    setLoading(true); // start loading on submit

    try {
      const registrationsRef = ref(database, 'event_registrations');
      await push(registrationsRef, formData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your registration has been submitted.',
        confirmButtonColor: '#1a365d',
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        institution: '',
        event: '',
      });
    } catch (error) {
      console.error('❌ Error submitting registration:', error);

      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false); // end loading
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-4 mt-20">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-64 relative">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20educational%20event%20conference%20hall%20with%20students%20and%20professionals%20networking%2C%20bright%20and%20airy%20space%20with%20natural%20lighting%2C%20high-end%20technology%20displays%20and%20presentation%20screens%2C%20people%20engaged%20in%20discussions%2C%20contemporary%20architectural%20interior%20design%20with%20minimal%20color%20palette&width=1024&height=512&seq=reg001&orientation=landscape"
            alt="Event Registration Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Event Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm"
                  required
                />
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm"
                  required
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm"
                />
              </div>
              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School/Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm"
                  required
                />
              </div>
              {/* Event Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Event <span className="text-red-500">*</span>
                </label>
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded appearance-none focus:outline-none focus:border-primary pr-8 bg-white text-sm"
                  required
                >
                  <option value="">Choose an event</option>
                  <option value="tech-conference">Youth Leadership Entrepreneurship Conference</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#1a365d',
                  width: '50%',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'block',
                  margin: '0 auto',
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Loading...' : 'Register Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EventRegistrationForm;
