export interface CreateVendorInput {
  name:string;
  ownerName: string;
  foodTypes: string[];
  pinCode:  string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface VendorData extends CreateVendorInput {
  _id?:string;
  salt: string;
  serviceAvailable: boolean;
  coverImages: string[];
  rating: number;
  //foods: any
}


export interface VendorLogin {
  email: string;
  password: string;
}

export interface VendorPayload{
  email:string;
  _id:string;
  foodTypes:string[];
}

export interface EditVendorInput {
  foodTypes?:string[];
  address?: string;
  phone?: string;
  email?: string;
  name?: string
}

