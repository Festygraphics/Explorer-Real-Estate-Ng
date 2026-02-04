
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Property, PropertyType } from '../types';

interface HomeProps {
  properties: Property[];
}

const Home: React.FC<HomeProps> = ({ properties }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const featured = properties.filter(p => p.featured).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/listings?q=${searchQuery}&type=${typeFilter}`);
  };

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[650px] flex items-center overflow-hidden bg-explorer-green">
        <div className="absolute inset-0 z-0 bg-explorer-green">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-0 transition-opacity duration-1000"
            alt="Hero background"
            onLoad={(e) => {
                e.currentTarget.classList.remove('opacity-0');
                e.currentTarget.classList.add('opacity-80');
            }}
          />
          {/* Lighter gradient to make image more visible while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl">
              Let Us Help You Solve Your <span className="text-explorer-accent italic">Land And House</span> Problem
            </h1>
            <p className="text-xl text-gray-100 mb-10 max-w-lg drop-shadow-lg font-medium">
              Buy, Sell and invest in affordable, world-class properties with Explorer Homes and Properties Ltd.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/listings"
                className="bg-explorer-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all text-center shadow-xl shadow-black/20"
              >
                View Properties
              </Link>
              <Link
                to="/contact"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-explorer-green transition-all text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Floating Search Bar */}
          <div className="absolute -bottom-12 left-4 right-4 md:left-8 md:right-auto md:w-[850px] bg-white rounded-3xl shadow-2xl p-6 md:p-8 text-gray-900 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Where to look?"
                    className="w-full bg-gray-50 border-0 rounded-xl py-4 px-4 focus:ring-2 focus:ring-explorer-accent transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Property Type</label>
                <select
                  className="w-full bg-gray-50 border-0 rounded-xl py-4 px-4 focus:ring-2 focus:ring-explorer-accent appearance-none cursor-pointer"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  {Object.values(PropertyType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl py-4 px-4 focus:ring-2 focus:ring-explorer-accent appearance-none cursor-pointer">
                  <option value="">Any Price</option>
                  <option value="low">Under ₦10M</option>
                  <option value="med">₦10M - ₦50M</option>
                  <option value="high">Above ₦50M</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-explorer-green text-white h-[56px] rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find Home</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-explorer-green rounded-[40px] p-12 text-white shadow-2xl">
          <div className="text-center border-r border-white/10 last:border-0">
            <p className="text-4xl font-bold mb-2">12k+</p>
            <p className="text-gray-300 text-sm uppercase tracking-widest font-medium">Customers</p>
          </div>
          <div className="text-center border-r border-white/10 last:border-0">
            <p className="text-4xl font-bold mb-2">500+</p>
            <p className="text-gray-300 text-sm uppercase tracking-widest font-medium">Properties</p>
          </div>
          <div className="text-center border-r border-white/10 last:border-0">
            <p className="text-4xl font-bold mb-2">25+</p>
            <p className="text-gray-300 text-sm uppercase tracking-widest font-medium">Locations</p>
          </div>
          <div className="text-center last:border-0">
            <p className="text-4xl font-bold mb-2">100%</p>
            <p className="text-gray-300 text-sm uppercase tracking-widest font-medium">Trust Score</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold text-explorer-green mb-4 italic">View Properties</h2>
            <p className="text-gray-600 text-lg">Our hand-picked selections of top properties available today.</p>
          </div>
          <Link to="/listings" className="hidden md:flex items-center text-explorer-accent font-bold group bg-explorer-accent/10 px-6 py-3 rounded-full hover:bg-explorer-accent hover:text-white transition-all">
            See all listings
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-24 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center gap-16 border border-gray-100">
        <div className="md:w-1/2">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000"
              className="rounded-[40px] shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
              alt="About Explorer Homes"
            />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-explorer-accent/10 rounded-full blur-3xl group-hover:bg-explorer-accent/20 transition-all"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-explorer-green/5 rounded-full blur-2xl group-hover:bg-explorer-green/10 transition-all"></div>
          </div>
        </div>
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-explorer-green leading-tight">
            A reliable & trusted <span className="text-explorer-accent italic underline decoration-explorer-accent/30 underline-offset-8">Property partner</span> with Explorer Real Estate and Properties Ltd.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We provide first-class real estate services tailored to meet your unique needs. Whether you are looking for your dream home, a strategic business location, or a lucrative land investment, our team of experts is dedicated to guiding you every step of the way.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-explorer-accent/20 transition-all">
              <div className="bg-explorer-accent p-3 rounded-xl shadow-lg shadow-emerald-500/20 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48V22" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-explorer-green text-lg">Verified Titles</h4>
                <p className="text-sm text-gray-500">Every property we list undergoes rigorous legal verification.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-explorer-accent/20 transition-all">
              <div className="bg-explorer-accent p-3 rounded-xl shadow-lg shadow-emerald-500/20 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-explorer-green text-lg">Secure Investment</h4>
                <p className="text-sm text-gray-500">We prioritize ROI and long-term value for our clients.</p>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <a
              href="https://wa.me/2348133796434?text=Hello,%20I'm%20interested%20in%20a%20property%20listing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-explorer-accent text-white px-10 py-5 rounded-full font-bold hover:bg-explorer-green transition-all shadow-xl shadow-emerald-500/20 hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp: +234 813 379 6434</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
