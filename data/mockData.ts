
import { Property, PropertyType, ListingStatus } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'A stunning modern villa with floor-to-ceiling windows, private pool, and automated home systems. Perfect for families looking for elegance and comfort in a quiet neighborhood.',
    price: 85000000,
    location: 'Lekki Phase 1, Lagos',
    bedrooms: 5,
    bathrooms: 6,
    area: 4500,
    type: PropertyType.HOUSE,
    status: ListingStatus.FOR_SALE,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Urban High-Rise Apartment',
    description: 'Centrally located luxury apartment with panoramic city views. Features include a modern gym, concierge service, and high-speed elevators.',
    price: 45000000,
    location: 'Victoria Island, Lagos',
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: PropertyType.APARTMENT,
    status: ListingStatus.FOR_SALE,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Prime Residential Land',
    description: 'A 600sqm plot of land in a fast-developing gated community. Excellent investment opportunity with guaranteed returns and clear title documents.',
    price: 15000000,
    location: 'Ibeju-Lekki, Lagos',
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    type: PropertyType.LAND,
    status: ListingStatus.FOR_SALE,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Cozy Family Bungalow',
    description: 'A well-maintained 3-bedroom bungalow with a spacious backyard and front porch. Ideal for a starter home or retirement retreat.',
    price: 32000000,
    location: 'Gwarinpa, Abuja',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    type: PropertyType.HOUSE,
    status: ListingStatus.FOR_SALE,
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Modern Studio Suite',
    description: 'Fully furnished studio apartment in the heart of the tech district. Minimalist design with maximum efficiency.',
    price: 2500000,
    location: 'Yaba, Lagos',
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    type: PropertyType.APARTMENT,
    status: ListingStatus.FOR_RENT,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: false,
    createdAt: new Date().toISOString()
  }
];
