
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetails from './pages/PropertyDetails';
import Admin from './pages/Admin';
import { Property } from './types';
import { INITIAL_PROPERTIES } from './data/mockData';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white rounded-[40px] shadow-2xl p-12 flex flex-col md:flex-row gap-12 border border-gray-100">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-explorer-green mb-6">Get In Touch</h2>
          <p className="text-gray-600 mb-8 text-lg">Have questions about our properties or services? Our team is here to help you every step of the way.</p>
          <div className="space-y-6">
            <a href="tel:+2348133796434" className="flex items-center space-x-4 group">
              <div className="bg-explorer-accent p-3 rounded-full text-white group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <span className="font-bold text-explorer-green text-xl transition-colors group-hover:text-explorer-accent">+234 813 379 6434</span>
            </a>
            <div className="flex items-center space-x-4">
              <div className="bg-explorer-accent p-3 rounded-full text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <span className="font-bold text-explorer-green text-xl">Lagos, Nigeria</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                placeholder="Your Name" 
                className={`w-full bg-gray-50 border-0 rounded-xl py-4 px-6 focus:ring-2 ${errors.name ? 'ring-2 ring-red-500' : 'focus:ring-explorer-accent'}`} 
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 ml-2">{errors.name}</p>}
            </div>
            <div>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                placeholder="Your Email" 
                className={`w-full bg-gray-50 border-0 rounded-xl py-4 px-6 focus:ring-2 ${errors.email ? 'ring-2 ring-red-500' : 'focus:ring-explorer-accent'}`} 
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
            </div>
            <div>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5} 
                placeholder="How can we help?" 
                className={`w-full bg-gray-50 border-0 rounded-xl py-4 px-6 focus:ring-2 ${errors.message ? 'ring-2 ring-red-500' : 'focus:ring-explorer-accent'}`} 
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1 ml-2">{errors.message}</p>}
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-explorer-green text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Inquiry</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('explorer_properties');
    if (saved) {
      setProperties(JSON.parse(saved));
    } else {
      setProperties(INITIAL_PROPERTIES);
      localStorage.setItem('explorer_properties', JSON.stringify(INITIAL_PROPERTIES));
    }
  }, []);

  const saveProperties = (updated: Property[]) => {
    setProperties(updated);
    localStorage.setItem('explorer_properties', JSON.stringify(updated));
  };

  const handleAddProperty = (p: Property) => {
    saveProperties([p, ...properties]);
  };

  const handleDeleteProperty = (id: string) => {
    saveProperties(properties.filter(p => p.id !== id));
  };

  const handleUpdateProperty = (p: Property) => {
    saveProperties(properties.map(item => item.id === p.id ? p : item));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home properties={properties} />} />
            <Route path="/listings" element={<Listings properties={properties} />} />
            <Route path="/property/:id" element={<PropertyDetails properties={properties} />} />
            <Route path="/admin" element={
              <Admin 
                properties={properties} 
                onAdd={handleAddProperty}
                onDelete={handleDeleteProperty}
                onUpdate={handleUpdateProperty}
              />
            } />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/2348133796434?text=Hello,%20I'm%20interested%20in%20a%20property%20listing." 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
          title="Chat on WhatsApp"
        >
          {/* Pulsing ring effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
          
          <svg className="w-9 h-9 relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          
          <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-2xl border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
            Chat with us
          </span>
        </a>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
