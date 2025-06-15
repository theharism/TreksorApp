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

export type WorkoutContent = {
    [key: string]: {
      id: string;
      title: string;
      videoUrl: string;
      stats: {
        burn: string;
        time: string;
      };
      content: {
        description: string;
        goals: {
          title: string;
          items: string[];
        };
      };
    };
};