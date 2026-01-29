type AvailabilityStatus = 'active' | 'consumed' | 'withdrawn' | 'expired';
type AvailabilityType = 'fulltime' | 'seasonal' | 'other';

export interface Mypost {
  id: string;
  title: string;
  type: AvailabilityType;
  status: AvailabilityStatus;
  createdAt?: string;
  schedule?: {
    start: string;
    end: string;
  };
  icon?: string; // optional, if you need old icon field
}
