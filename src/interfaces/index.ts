export interface AuthLayoutProps {
  children: React.ReactNode;
}
export interface VesselDataInterface {
  name: string;
  call_sign: string | null;
  description: string | null;
  id: number;
  loa: number | null;
  mmsi: string | null;
  weight: number | null;
  image: string | null;
}
export interface UserInterface {
  username: string;
  email: string;
}
interface Contract {
  id: string;
  speed: string;
  fo: string;
  do: string;
  description: string;
}

interface AboutClause {
  id: string | false;
  aboutSpeed: boolean;
  aboutSpeedValue: number | null;
  aboutFOC: boolean;
  aboutFOCValue: number | null;
}

interface OperationalCriteria {
  id: string | false;
  rpm: boolean;
  engineLoad: boolean;
  steamingTime: boolean;
}

export interface VoyageDataInterface {
  voyage: {
    name: string;
    vessel: string;
    start_port: {
      id: number;
      name: string;
      country: string;
      latitude: string;
      longitude: string;
    };
    destination_port: {
      id: number;
      name: string;
      country: string;
      latitude: string;
      longitude: string;
    };
    cargo: string;
    contract: Contract[];
    aboutClause: AboutClause;
    operationalCriteria: OperationalCriteria;
  };
  contract: [
    {
      id: number;
      speed: number;
      fo: number;
      do: number;
      description: string;
      user: number;
      voyage: number;
    }
  ];
}

export interface Coordinates {
  lat: number;
  lng: number;
}
