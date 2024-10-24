export interface Pet {
  id: number;
  category?: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls?: string[];
  tags?: {
    id: number;
    name: string;
  }[];
  status: 'available' | 'pending' | 'sold';
}
