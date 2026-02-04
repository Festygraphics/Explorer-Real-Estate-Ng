
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-explorer-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {property.status}
          </span>
        </div>
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-explorer-accent text-white px-3 py-1 rounded-full text-xs font-bold">
              FEATURED
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-xl font-bold text-explorer-green">
            {formatCurrency(property.price)}
          </p>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-explorer-accent transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1 text-explorer-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center text-gray-600 text-sm">
            <span className="font-semibold mr-1">{property.bedrooms}</span>
            <span className="text-xs uppercase">Beds</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="font-semibold mr-1">{property.bathrooms}</span>
            <span className="text-xs uppercase">Baths</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="font-semibold mr-1">{property.area}</span>
            <span className="text-xs uppercase">sqft</span>
          </div>
        </div>

        <Link
          to={`/property/${property.id}`}
          className="mt-6 w-full text-center py-3 rounded-xl bg-gray-50 text-explorer-green font-semibold hover:bg-explorer-green hover:text-white transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
