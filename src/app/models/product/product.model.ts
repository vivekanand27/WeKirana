export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  availableQuantity: number;
  // image?: File;
  imagePath?: string;
  createdBy: string;
}
