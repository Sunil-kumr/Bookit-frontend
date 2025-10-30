import type { Experience } from "./experience";

export type Booking = {
  experience: Experience;
  date: string;
  time: string;
  qty: number;
  subtotal: number;
  taxes: number;
  total: number;
};
