export type CoverageLevel = "full" | "partial" | "limited";

export type LocationCity = {
  id: string;
  name: string;
  state: string;
  region: string;
  deliveryEta: string;
  sellers: number;
  services: number;
  transport: string;
  coverage: CoverageLevel;
  highlights: string[];
};
