import { CityI } from "./City";
export interface LocationI {
  lat: number;
  lng: number;
}
export interface EventI {
  name: string;
  city: CityI;
  picture: string;
  description: string;
  place: LocationI;
  date: Date;
  duration: number;
  cost: number;
  category: string;
}
