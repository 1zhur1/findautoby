export interface Brand {
  id: string;
  name: string;
  country: string;
  logo?: string;
}

export interface BrandModels {
  brandId: string;
  models: string[];
}

export const brands: Brand[] = [
  { id: 'acura', name: 'Acura', country: 'Japan' },
  { id: 'alfa-romeo', name: 'Alfa Romeo', country: 'Italy' },
  { id: 'alpina', name: 'Alpina', country: 'Germany' },
  { id: 'aston-martin', name: 'Aston Martin', country: 'UK' },
  { id: 'audi', name: 'Audi', country: 'Germany' },
  { id: 'bentley', name: 'Bentley', country: 'UK' },
  { id: 'bmw', name: 'BMW', country: 'Germany' },
  { id: 'bugatti', name: 'Bugatti', country: 'France' },
  { id: 'byd', name: 'BYD', country: 'China' },
  { id: 'cadillac', name: 'Cadillac', country: 'USA' },
  { id: 'chevrolet', name: 'Chevrolet', country: 'USA' },
  { id: 'chery', name: 'Chery', country: 'China' },
  { id: 'citroen', name: 'Citroen', country: 'France' },
  { id: 'cupra', name: 'Cupra', country: 'Spain' },
  { id: 'dacia', name: 'Dacia', country: 'Romania' },
  { id: 'daewoo', name: 'Daewoo', country: 'South Korea' },
  { id: 'dodge', name: 'Dodge', country: 'USA' },
  { id: 'ferrari', name: 'Ferrari', country: 'Italy' },
  { id: 'fiat', name: 'Fiat', country: 'Italy' },
  { id: 'ford', name: 'Ford', country: 'USA' },
  { id: 'geely', name: 'Geely', country: 'China' },
  { id: 'genesis', name: 'Genesis', country: 'South Korea' },
  { id: 'gmc', name: 'GMC', country: 'USA' },
  { id: 'great-wall', name: 'Great Wall', country: 'China' },
  { id: 'honda', name: 'Honda', country: 'Japan' },
  { id: 'hyundai', name: 'Hyundai', country: 'South Korea' },
  { id: 'infiniti', name: 'Infiniti', country: 'Japan' },
  { id: 'isuzu', name: 'Isuzu', country: 'Japan' },
  { id: 'jaguar', name: 'Jaguar', country: 'UK' },
  { id: 'jeep', name: 'Jeep', country: 'USA' },
  { id: 'kia', name: 'Kia', country: 'South Korea' },
  { id: 'lamborghini', name: 'Lamborghini', country: 'Italy' },
  { id: 'land-rover', name: 'Land Rover', country: 'UK' },
  { id: 'lexus', name: 'Lexus', country: 'Japan' },
  { id: 'lincoln', name: 'Lincoln', country: 'USA' },
  { id: 'lotus', name: 'Lotus', country: 'UK' },
  { id: 'maserati', name: 'Maserati', country: 'Italy' },
  { id: 'mazda', name: 'Mazda', country: 'Japan' },
  { id: 'mclaren', name: 'McLaren', country: 'UK' },
  { id: 'mercedes-benz', name: 'Mercedes-Benz', country: 'Germany' },
  { id: 'mg', name: 'MG', country: 'UK/China' },
  { id: 'mini', name: 'Mini', country: 'UK' },
  { id: 'mitsubishi', name: 'Mitsubishi', country: 'Japan' },
  { id: 'nissan', name: 'Nissan', country: 'Japan' },
  { id: 'opel', name: 'Opel', country: 'Germany' },
  { id: 'peugeot', name: 'Peugeot', country: 'France' },
  { id: 'polestar', name: 'Polestar', country: 'Sweden' },
  { id: 'porsche', name: 'Porsche', country: 'Germany' },
  { id: 'ram', name: 'RAM', country: 'USA' },
  { id: 'renault', name: 'Renault', country: 'France' },
  { id: 'rolls-royce', name: 'Rolls-Royce', country: 'UK' },
  { id: 'saab', name: 'Saab', country: 'Sweden' },
  { id: 'seat', name: 'Seat', country: 'Spain' },
  { id: 'skoda', name: 'Skoda', country: 'Czech Republic' },
  { id: 'smart', name: 'Smart', country: 'Germany' },
  { id: 'subaru', name: 'Subaru', country: 'Japan' },
  { id: 'suzuki', name: 'Suzuki', country: 'Japan' },
  { id: 'tesla', name: 'Tesla', country: 'USA' },
  { id: 'toyota', name: 'Toyota', country: 'Japan' },
  { id: 'volkswagen', name: 'Volkswagen', country: 'Germany' },
  { id: 'volvo', name: 'Volvo', country: 'Sweden' },
  { id: 'zeekr', name: 'Zeekr', country: 'China' },
];

export const brandModels: BrandModels[] = [
  {
    brandId: 'bmw',
    models: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'XM', 'Z4', 'i3', 'i4', 'i5', 'i7', 'iX', 'iX1', 'iX3', 'M2', 'M3', 'M4', 'M5', 'M8'],
  },
  {
    brandId: 'mercedes-benz',
    models: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'CLA', 'CLS', 'AMG GT', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'EQV', 'V-Class', 'Sprinter'],
  },
  {
    brandId: 'audi',
    models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'Q8 e-tron', 'e-tron GT', 'TT', 'R8'],
  },
  {
    brandId: 'volkswagen',
    models: ['Polo', 'Golf', 'Passat', 'T-Roc', 'Tiguan', 'Touareg', 'ID.3', 'ID.4', 'ID.5', 'ID.7', 'Arteon', 'Caddy', 'Multivan', 'Crafter', 'Amarok'],
  },
  {
    brandId: 'toyota',
    models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Land Cruiser Prado', 'Highlander', 'Yaris', 'C-HR', 'Supra', 'GR Yaris', 'Hilux', 'Fortuner', 'Mirai', 'bZ4X'],
  },
  {
    brandId: 'lexus',
    models: ['ES', 'IS', 'LS', 'NX', 'RX', 'UX', 'LX', 'GX', 'LC', 'LM'],
  },
  {
    brandId: 'skoda',
    models: ['Octavia', 'Superb', 'Kodiaq', 'Karoq', 'Kamiq', 'Fabia', 'Scala', 'Enyaq', 'Enyaq Coupe'],
  },
  {
    brandId: 'volvo',
    models: ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90', 'C40', 'EX30', 'EX90'],
  },
  {
    brandId: 'tesla',
    models: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck', 'Roadster'],
  },
  {
    brandId: 'hyundai',
    models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'IONIQ 5', 'IONIQ 6', 'IONIQ 9', 'Nexo', 'Staria'],
  },
  {
    brandId: 'kia',
    models: ['Rio', 'Cerato', 'K5', 'Sorento', 'Sportage', 'Seltos', 'Stonic', 'EV6', 'EV9', 'Niro', 'Carnival', 'Stinger'],
  },
  {
    brandId: 'honda',
    models: ['Accord', 'Civic', 'CR-V', 'HR-V', 'Jazz', 'Pilot', 'NSX', 'e:Ny1'],
  },
  {
    brandId: 'nissan',
    models: ['Altima', 'Qashqai', 'X-Trail', 'Pathfinder', 'Juke', 'Leaf', 'Ariya', 'Navara', 'GT-R', 'Patrol'],
  },
  {
    brandId: 'mazda',
    models: ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-30', 'CX-60', 'CX-90', 'MX-5'],
  },
  {
    brandId: 'porsche',
    models: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Cayman', 'Boxster'],
  },
  {
    brandId: 'ford',
    models: ['Focus', 'Mondeo', 'Kuga', 'Explorer', 'Mustang', 'Mustang Mach-E', 'Transit', 'Ranger', 'Bronco', 'Puma', 'F-150'],
  },
  {
    brandId: 'chevrolet',
    models: ['Cruze', 'Malibu', 'Equinox', 'Tahoe', 'Camaro', 'Corvette', 'Trailblazer', 'Traverse'],
  },
  {
    brandId: 'renault',
    models: ['Clio', 'Megane', 'Scenic', 'Captur', 'Arkana', 'Austral', 'Kadjar', 'Koleos', 'Zoe', 'Megan E-Tech'],
  },
  {
    brandId: 'peugeot',
    models: ['208', '308', '508', '2008', '3008', '5008', 'Rifter', 'e-208', 'e-308', 'e-2008'],
  },
  {
    brandId: 'citroen',
    models: ['C3', 'C4', 'C5 X', 'C3 Aircross', 'C4 SpaceTourer', 'Berlingo', 'Ami', 'e-C4'],
  },
  {
    brandId: 'opel',
    models: ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Grandland', 'Combo', 'Vivaro', 'Astra Electric'],
  },
  {
    brandId: 'fiat',
    models: ['500', 'Panda', 'Tipo', '500X', '500L', 'Doblo', 'Ducato'],
  },
  {
    brandId: 'audi',
    models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron GT', 'TT', 'R8'],
  },
  {
    brandId: 'land-rover',
    models: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Discovery', 'Discovery Sport', 'Defender'],
  },
  {
    brandId: 'jaguar',
    models: ['XE', 'XF', 'XJ', 'F-PACE', 'E-PACE', 'I-PACE', 'F-TYPE'],
  },
  {
    brandId: 'mini',
    models: ['Cooper', 'Cooper S', 'Countryman', 'Clubman', 'Electric', 'John Cooper Works'],
  },
  {
    brandId: 'subaru',
    models: ['Impreza', 'Legacy', 'Outback', 'Forester', 'XV', 'BRZ', 'WRX', 'Levorg'],
  },
  {
    brandId: 'mitsubishi',
    models: ['Lancer', 'Outlander', 'ASX', 'Eclipse Cross', 'Pajero', 'Pajero Sport', 'L200'],
  },
  {
    brandId: 'chery',
    models: ['Tiggo 2', 'Tiggo 4', 'Tiggo 7', 'Tiggo 8', 'Tiggo 8 Pro', 'Arrizo 5', 'Arrizo 8', 'Omoda 5'],
  },
  {
    brandId: 'geely',
    models: ['Atlas', 'Monjaro', 'Tugella', 'Coolray', 'Emgrand', 'Geometry A', 'Zeekr 001', 'Zeekr 009'],
  },
  {
    brandId: 'byd',
    models: ['Atto 3', 'Dolphin', 'Seal', 'Han', 'Tang', 'Yuan Plus', 'Song Plus', 'e2'],
  },
  {
    brandId: 'polestar',
    models: ['Polestar 1', 'Polestar 2', 'Polestar 3', 'Polestar 4'],
  },
  {
    brandId: 'cupra',
    models: ['Leon', 'Formentor', 'Born', 'Ateca', 'Tavascan'],
  },
  {
    brandId: 'genesis',
    models: ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80'],
  },
  {
    brandId: 'dacia',
    models: ['Sandero', 'Logan', 'Duster', 'Jogger', 'Spring'],
  },
  {
    brandId: 'seat',
    models: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
  },
  {
    brandId: 'mg',
    models: ['ZS', 'HS', 'Marvel R', 'MG4', 'MG5', 'MG ONE', 'Cyberster'],
  },
  {
    brandId: 'smart',
    models: ['Fortwo', 'Forfour', '#1', '#3'],
  },
  {
    brandId: 'suzuki',
    models: ['Swift', 'Vitara', 'S-Cross', 'Jimny', 'Ignis', 'Across', 'Swace'],
  },
];