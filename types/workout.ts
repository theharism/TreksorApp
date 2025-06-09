export interface Exercise {
    id:string;
    title:string;
    description:string;
    tip: string;
    completed: boolean;
}

export interface Workout {
    id:string;
    title: string;
    description: string;
    exercises: Exercise[]
}