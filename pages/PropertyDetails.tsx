
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyDetailsProps {
  properties: Property[];
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ properties }) => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-explorer-green">Property not found</h2>
        <Link to="/listings" className="text-explorer-accent mt-4 inline-block hover:underline">Back to listings</Link>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert("Thank you! Your inquiry about '" + property.title + "' has been sent to our agents.");
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={property.images[activeImage]}
                className="w-full h-full object-cover transition-opacity duration-500"
                alt={property.title}
              />
            </div>
            {property.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-4 transition-all ${
                      activeImage === idx ? 'border-explorer-accent scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Header */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="bg-explorer-accent/10 text-explorer-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                  {property.type} • {property.status}
                </span>
                <h1 className="text-4xl font-bold text-explorer-green">{property.title}</h1>
                <p className="text-gray-500 mt-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-explorer-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-explorer-accent">{formatCurrency(property.price)}</p>
                <p className="text-sm text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100 mb-8">
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-gray-400 uppercase">Bedrooms</p>
                <p className="text-xl font-bold text-explorer-green">{property.bedrooms || 'N/A'}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-gray-400 uppercase">Bathrooms</p>
                <p className="text-xl font-bold text-explorer-green">{property.bathrooms || 'N/A'}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-gray-400 uppercase">Living Area</p>
                <p className="text-xl font-bold text-explorer-green">{property.area} sqft</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-gray-400 uppercase">Published</p>
                <p className="text-xl font-bold text-explorer-green">{new Date(property.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-explorer-green">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-explorer-green p-8 rounded-[40px] shadow-xl sticky top-28 text-white border border-white/5">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-explorer-accent shadow-lg">
                <img src="https://picsum.photos/100/100?random=1" alt="Agent" />
              </div>
              <div>
                <p className="font-bold text-lg">Agent Explorer</p>
                <p className="text-explorer-accent text-sm font-semibold">Property Specialist</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 italic">Inquire About This Property</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className={`w-full bg-white/10 border border-white/20 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${errors.name ? 'ring-2 ring-red-400 border-red-400' : 'focus:ring-explorer-accent'}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className={`w-full bg-white/10 border border-white/20 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${errors.email ? 'ring-2 ring-red-400 border-red-400' : 'focus:ring-explorer-accent'}`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full bg-white/10 border border-white/20 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${errors.phone ? 'ring-2 ring-red-400 border-red-400' : 'focus:ring-explorer-accent'}`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="I'm interested in this property..."
                  className={`w-full bg-white/10 border border-white/20 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${errors.message ? 'ring-2 ring-red-400 border-red-400' : 'focus:ring-explorer-accent'}`}
                ></textarea>
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-explorer-accent py-4 rounded-xl font-bold hover:bg-white hover:text-explorer-green transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-explorer-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-2">
              <p className="text-sm text-gray-400">Prefer direct contact?</p>
              <a href="tel:+2348133796434" className="font-bold text-2xl text-white hover:text-explorer-accent transition-colors block">
                +234 813 379 6434
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
