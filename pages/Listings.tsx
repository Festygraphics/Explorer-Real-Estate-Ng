
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Property, PropertyType, ListingStatus } from '../types';

interface ListingsProps {
  properties: Property[];
}

const Listings: React.FC<ListingsProps> = ({ properties }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [filters, setFilters] = useState({
    search: queryParams.get('q') || '',
    type: queryParams.get('type') || '',
    status: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          p.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type ? p.type === filters.type : true;
      const matchStatus = filters.status ? p.status === filters.status : true;
      const matchMinPrice = filters.minPrice ? p.price >= parseInt(filters.minPrice) : true;
      const matchMaxPrice = filters.maxPrice ? p.price <= parseInt(filters.maxPrice) : true;
      const matchBeds = filters.bedrooms ? p.bedrooms >= parseInt(filters.bedrooms) : true;

      return matchSearch && matchType && matchStatus && matchMinPrice && matchMaxPrice && matchBeds;
    });
  }, [properties, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
            <h3 className="text-xl font-bold text-explorer-green mb-6">Filter Properties</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Search</label>
                <input
                  name="search"
                  type="text"
                  placeholder="Title or location..."
                  className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Type</label>
                <select
                  name="type"
                  className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <select
                  name="status"
                  className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">Any Status</option>
                  {Object.values(ListingStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range</label>
                <div className="flex gap-2">
                  <input
                    name="minPrice"
                    type="number"
                    placeholder="Min"
                    className="w-1/2 bg-gray-50 border-0 rounded-lg py-3 px-3 focus:ring-2 focus:ring-explorer-accent text-sm"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                  <input
                    name="maxPrice"
                    type="number"
                    placeholder="Max"
                    className="w-1/2 bg-gray-50 border-0 rounded-lg py-3 px-3 focus:ring-2 focus:ring-explorer-accent text-sm"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bedrooms</label>
                <select
                  name="bedrooms"
                  className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+ Beds</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>

              <button
                onClick={() => setFilters({ search: '', type: '', status: '', minPrice: '', maxPrice: '', bedrooms: '' })}
                className="w-full py-3 rounded-lg border-2 border-explorer-accent text-explorer-accent font-bold hover:bg-explorer-accent hover:text-white transition-all"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="md:w-3/4">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-bold text-explorer-green">{filteredProperties.length}</span> results
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="bg-transparent border-0 font-bold text-explorer-green focus:ring-0 cursor-pointer">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-gray-300">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-2xl font-bold text-explorer-green mb-2">No Properties Found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                We couldn't find any properties matching your current criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
