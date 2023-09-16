export interface Exercise {
    id: string;
    series: number;
    reps: number;
    pr: number;
}

export interface Chart {
    id: string;
    exercises: Exercise[];
}
