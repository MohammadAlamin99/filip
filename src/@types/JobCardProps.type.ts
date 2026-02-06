export interface JobCardProps {
  job: {
    title: string;
    user: {
      name: string;
      photo: string;
    };
    location: string;
    rate: {
      amount: number;
      unit: string;
    };
    type: string;
    image: string;
  };
  onApply?: () => void;
  onBookmark?: () => void;
}
