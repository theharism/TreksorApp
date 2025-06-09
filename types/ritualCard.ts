export interface RitualCard {
    id: string;
    title: string;
    ritualsCompleted: number;
    totalRituals: number;
    image: any;
    isLocked?: boolean;
    availableDate?: string;
    backgroundColor: string;
    route: string;
}
  