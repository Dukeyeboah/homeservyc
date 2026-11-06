import { LayoutGrid } from 'lucide-react';
const categories: Record<string, {src: string; color: string; light: string}> = {
  "Caretaker / Nanny": {
    "src": "/design/icons/caretaker-nanny.svg",
    "light": "#d2b9ff",
    "color": "#6030c9"
  },
  "Cleaner": {
    "src": "/design/icons/cleaner.svg",
    "light": "#8cecff",
    "color": "#087bd7"
  },
  "Cook / Chef": {
    "src": "/design/icons/cook-chef.svg",
    "light": "#ffd19a",
    "color": "#ef6030"
  },
  "Driver": {
    "src": "/design/icons/driver.svg",
    "light": "#96caff",
    "color": "#3159cd"
  },
  "French Teacher": {
    "src": "/design/icons/french-teacher.svg",
    "light": "#e4b0ff",
    "color": "#8137b8"
  },
  "Gardener": {
    "src": "/design/icons/gardener.svg",
    "light": "#abf0c1",
    "color": "#128759"
  },
  "Home Care": {
    "src": "/design/icons/home-care.svg",
    "light": "#a2e7dd",
    "color": "#138b89"
  },
  "Housekeeper": {
    "src": "/design/icons/housekeeper.svg",
    "light": "#ffa995",
    "color": "#de413c"
  },
  "Mason": {
    "src": "/design/icons/mason.svg",
    "light": "#ffd184",
    "color": "#cf6821"
  },
  "Nanny": {
    "src": "/design/icons/nanny.svg",
    "light": "#ffb7da",
    "color": "#ce378a"
  },
  "Personal Assistant": {
    "src": "/design/icons/personal-assistant.svg",
    "light": "#b8b4ff",
    "color": "#5240bf"
  },
  "Pet Care": {
    "src": "/design/icons/pet-care.svg",
    "light": "#e8cd95",
    "color": "#a96b28"
  },
  "Photographer": {
    "src": "/design/icons/photographer.svg",
    "light": "#ffa5cf",
    "color": "#cd2e88"
  },
  "Piano Teacher": {
    "src": "/design/icons/piano-teacher.svg",
    "light": "#c8beff",
    "color": "#6150bc"
  },
  "Pool Cleaner": {
    "src": "/design/icons/pool-cleaner.svg",
    "light": "#9cecf3",
    "color": "#087fa6"
  },
  "Qualified Midwife": {
    "src": "/design/icons/qualified-midwife.svg",
    "light": "#ffc2cd",
    "color": "#ce456b"
  },
  "Registered Nurse": {
    "src": "/design/icons/registered-nurse.svg",
    "light": "#a3dfff",
    "color": "#2477bb"
  },
  "Security": {
    "src": "/design/icons/security.svg",
    "light": "#b7c8dc",
    "color": "#405b7a"
  },
  "Washing Lady": {
    "src": "/design/icons/washing-lady.svg",
    "light": "#a8e3ff",
    "color": "#287fc3"
  }
};
export function categoryStyle(category: string) { return categories[category] ?? { src: '', color: '#ed704c', light: '#ffbc9c' }; }
export function CategoryIcon({ category, small = false }: { category: string; small?: boolean }) {
 const {src} = categoryStyle(category);
 return src ? <img alt="" aria-hidden="true" src={src} className={`category-art ${small ? 'category-art-small' : ''}`}/> : <span aria-hidden="true" className={`category-icon ${small ? 'category-icon-small' : ''}`} style={{background:'linear-gradient(145deg,#ffbd9b,#f16b45)'}}><LayoutGrid size={small ? 19 : 29}/></span>;
}
