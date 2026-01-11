export default interface Worker {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  price: string;
  distance: string;
  bio: string;
  tags: string[];
  isVerified?: boolean;
  isAvailable: boolean;
  image: string;
}
