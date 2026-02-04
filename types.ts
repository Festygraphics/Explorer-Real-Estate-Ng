
export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  LAND = 'Land',
  COMMERCIAL = 'Commercial'
}

export enum ListingStatus {
  FOR_SALE = 'For Sale',
  FOR_RENT = 'For Rent'
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  type: PropertyType;
  status: ListingStatus;
  images: string[];
  featured: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  timestamp: string;
}
