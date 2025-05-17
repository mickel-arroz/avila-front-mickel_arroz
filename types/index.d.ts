export interface Flight {
  id: number;
  destination: string;
  class: "Económica" | "Ejecutiva" | "Primera";
  priceUSD: number;
}

export interface FlightData {
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: string;
  priceUSD: number;
}

export interface FlightFormProps {
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: string;
  onChange: (field: keyof FlightData, value: string) => void;
}

export interface TravelerFormData {
  numTravelers: number;
  travelers: {
    fullName: string;
    birthDate: string;
    idType: string;
    idNumber: string;
  }[];
  hasPets: boolean;
  petCount: number;
  hasExtraLuggage: boolean;
  extraLuggageCount: number;
}

export interface TravelerFormProps {
  formData: TravelerFormData;
  setFormData: React.Dispatch<React.SetStateAction<TravelerFormData>>;
  fieldErrors?: Record<
    number,
    Partial<Record<keyof TravelerFormData["travelers"][0], string>>
  >;
}

export interface Traveler {
  fullName: string;
  birthDate: string;
  idType: string;
  idNumber: string;
}

export interface TravelInfo {
  numTravelers: number;
  travelers: Traveler[];
  hasPets: boolean;
  petCount: number;
  hasExtraBags: boolean;
  extraBagsCount: number;
}
