const translationDictionary = {
    'name': 'nome',
    'brand': 'marca',
    "brand_name": "marca",
    "fuel_type": "Combustível",
    "mileage": "quilometragem",
    "model_year": "ano do modelo",
    "sale_value": "valor de venda",
    "transmission": "câmbio",
    "fuel_type_formatted":"combustível", 
    "mileage_formatted":"quilometragem", 
    "model_name":"modelo", 
    "sale_value_formatted":"valor de venda", 
    "transmission_formatted":"câmbio"
  };

const translateKeys = (obj) => {
  const translatedObj = {};
  for (const key in obj) {
    const translatedKey = translationDictionary[key] || key;
    translatedObj[translatedKey] = obj[key];
  }
  return translatedObj;
}

export default translateKeys;