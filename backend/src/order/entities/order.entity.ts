export class OrderTicketEntity {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  day?: string;
  time?: string;
}
