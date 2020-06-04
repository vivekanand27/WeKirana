export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  contactNumber?: number;
  isShopOwner: boolean;
  shopName?: string;
  shopAddress?: string;
  email: string;
  password: string;
  createdOn?: string;
  updatedOn?: string;
}
