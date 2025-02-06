export interface Vehicle {
    id: number;
    name: string;
    details: {
      currency: string;
      price: string;
      color: string;
      brand: string;
      manufactureYear: string;
      image: string;
      description: string;
    };
  }
  
  export interface BidVehicle extends Vehicle {
    bidAmount: number;
  }