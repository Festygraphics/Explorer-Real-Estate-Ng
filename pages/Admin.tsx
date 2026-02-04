
import React, { useState } from 'react';
import { Property, PropertyType, ListingStatus } from '../types';
import { generatePropertyDescription } from '../services/geminiService';

interface AdminProps {
  properties: Property[];
  onAdd: (p: Property) => void;
  onDelete: (id: string) => void;
  onUpdate: (p: Property) => void;
}

const Admin: React.FC<AdminProps> = ({ properties, onAdd, onDelete, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: PropertyType.HOUSE,
    status: ListingStatus.FOR_SALE,
    images: ['https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=1200'],
    featured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty: Property = {
      ...formData as Property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    onAdd(newProperty);
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      price: 0,
      location: '',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      type: PropertyType.HOUSE,
      status: ListingStatus.FOR_SALE,
      images: ['https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=1200'],
      featured: false
    });
  };

  const handleAIGenerate = async () => {
    if (!formData.title || !formData.location) {
      alert("Please enter a title and location first.");
      return;
    }
    setIsGeneratingAI(true);
    const aiDesc = await generatePropertyDescription({
      title: formData.title!,
      type: formData.type!,
      location: formData.location!,
      bedrooms: formData.bedrooms || 0,
      features: ['Modern Kitchen', 'Gated Community']
    });
    setFormData(prev => ({ ...prev, description: aiDesc }));
    setIsGeneratingAI(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-explorer-green">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your property catalog</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-explorer-accent text-white px-6 py-3 rounded-xl font-bold hover-explorer-accent transition-all flex items-center"
        >
          {isAdding ? 'Cancel' : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Property
            </>
          )}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-explorer-green mb-8">Add New Listing</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Property Title</label>
              <input
                required
                className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Luxury 5 Bedroom Villa"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</label>
              <input
                required
                className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Lekki, Lagos"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price (₦)</label>
              <input
                required
                type="number"
                className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Type</label>
              <select
                className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as PropertyType })}
              >
                {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Beds</label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                  value={formData.bedrooms}
                  onChange={e => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Baths</label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                  value={formData.bathrooms}
                  onChange={e => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sqft</label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                  value={formData.area}
                  onChange={e => setFormData({ ...formData, area: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Listing Status</label>
              <select
                className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as ListingStatus })}
              >
                {Object.values(ListingStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={isGeneratingAI}
                  className="text-xs font-bold text-explorer-accent hover:text-explorer-green flex items-center space-x-1"
                >
                  <svg className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{isGeneratingAI ? 'Thinking...' : 'Generate with Gemini AI'}</span>
                </button>
              </div>
              <textarea
                required
                rows={5}
                className="w-full bg-gray-50 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-explorer-accent"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the property highlights..."
              ></textarea>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                className="w-5 h-5 text-explorer-accent border-gray-300 rounded focus:ring-explorer-accent"
                checked={formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="text-sm font-bold text-gray-700">Mark as Featured Listing</label>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-explorer-green text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
              >
                Create Property Listing
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Listings Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Property</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map(property => (
              <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <img src={property.images[0]} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-explorer-green">{property.title}</p>
                      <p className="text-xs text-gray-400">{property.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="font-bold">₦{(property.price / 1000000).toFixed(1)}M</p>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                    {property.type}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button
                    onClick={() => onDelete(property.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
