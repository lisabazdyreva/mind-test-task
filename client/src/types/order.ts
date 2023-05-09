export interface IPostedOrder {
  userId: string | null;
  customer_telephone: string;
  sum: number;
}

export interface IReceivedOrder {
  userId: string | null;
  customer_telephone: string;
  id: number;
}
