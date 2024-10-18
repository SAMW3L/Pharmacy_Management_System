export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Sale {
  id: string;
  medicineId: string;
  quantity: number;
  totalPrice: number;
  date: string;
}

export interface User {
  username: string;
  password: string;
}