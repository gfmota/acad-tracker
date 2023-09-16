export interface Exercise {
    id: number;
    name: string;
    series: number;
    reps: number;
}

export interface Chart {
    id: number;
    name: string;
    exercises: Exercise[];
}
