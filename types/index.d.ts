export interface Flight {
  id: number;
  destination: string;
  class: "Económica" | "Ejecutiva" | "Primera";
  price: number;
}
