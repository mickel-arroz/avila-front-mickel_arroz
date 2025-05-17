export interface ReservationSummaryData {
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: string;
  priceUSD: number;
  petCount: number;
  extraLuggageCount: number;
  travelers: {
    fullName: string;
    birthDate: string;
  }[];
  travelInsurance: boolean;
  preferredSeats: boolean;
  specialAssistance: boolean;
  assistanceNote?: string;
}
