export interface CarModel {
  code:        string;
  description: string;
  colors:      Color[];
}

export interface Color {
  code:        string;
  description: string;
  price:       number;
}

export interface CarOptions {
  configs:  Config[];
  towHitch: boolean;
  yoke:     boolean;
}

export interface Config {
  id:          number;
  description: string;
  range:       number;
  speed:       number;
  price:       number;
}


export interface SelectedConfig {
  car: CarModel;
  color: Color;
  config: Config;
  yoke: boolean;
  towHitch: boolean;
}
