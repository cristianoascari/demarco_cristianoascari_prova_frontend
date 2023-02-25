export interface IOrder {
  customerId: number;
  id: number;
  items: IOrderItem[];
  total: number;
}

export interface IOrderItem {
  item: string;
  value: number;
}
