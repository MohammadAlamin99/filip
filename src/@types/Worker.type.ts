export default interface Worker {
  id: string;
  name?: string;
  rating: number;
  reviews: number;
  price?: number;
  date?: string | any;
  isAvailable: boolean | string;
  type?: string;
  distance: string;
  isVerified: boolean;
  bio: string;
  tags: string[];
  image: string;
  banner: string;
  role: string;
  location: string;
  seasonLabel: string;
  isLocked?: boolean;
  status?: string;
}
