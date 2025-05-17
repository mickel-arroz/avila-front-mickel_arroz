export interface ServicesAdditionalFormData {
  travelInsurance: boolean;
  preferredSeats: boolean;
  specialAssistance: boolean;
  assistanceNote: string;
}

export interface ServicesAdditionalFormProps {
  formData: ServicesAdditionalFormData;
  setFormData: React.Dispatch<React.SetStateAction<ServicesAdditionalFormData>>;
}
