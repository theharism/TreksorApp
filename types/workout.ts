export interface Exercise {
    id:string;
    title:string;
    description:string;
    completed: boolean;
}

export type Exercises = Record<string, Exercise[]>;  

export interface Workout {
    id:string;
    icon: string;
    title: string;
    description: string;
    percentage: number;
    exercises: Exercises
}