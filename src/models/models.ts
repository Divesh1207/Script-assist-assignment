
export interface Starship {
    id?: number; 
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    passengers: string;
    cargo_capacity: string;
    starship_class: string;
  }
  
  export interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
  }
  
  export interface Planet {
    name: string;
    climate: string;
    terrain: string;
    population: string;
  }
  export interface Film {
    title: string;
    release_date: string;
    
  }
  export interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    language: string;
    homeworld?: string;
}
export interface CardComponentProps {
  title: string;
  badgeLabel: string;
  details: React.ReactNode;
  onClick: () => void;
  accordionItems: { label: string; content: React.ReactNode }[];  
}