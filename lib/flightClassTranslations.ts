export const flightClassTranslations: Record<string, string> = {
  Economy: "Económica",
  Business: "Ejecutiva",
  "First Class": "Primera Clase",
  "Premium Economy": "Económica Premium",
};

export const translateClass = (flightClass: string) => {
  return flightClassTranslations[flightClass] || flightClass;
};
