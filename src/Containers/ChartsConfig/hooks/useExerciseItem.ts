import { useState } from 'react';
import { useCharts } from '../context';
import { Exercise } from '../types';

const useExerciseItem = (id: number) => {
    const { currentChart, removeExercise, updateExercise } = useCharts();
    const [isEditting, setIsEditting] = useState(false);

    const remove = () => removeExercise(currentChart.id, id);

    const update = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const exercise = e.target as any;
        const exerciseName = exercise.name.value;
        if (
            currentChart.exercises.find(
                ({ name, id: exerciseId }) =>
                    name === exerciseName && exerciseId !== id,
            )
        ) {
            alert(
                `Já existe um exercício com esse nome na ficha ${currentChart.name}`,
            );
            return;
        }
        const newExercise = {
            id,
            name: exerciseName,
            reps: parseInt(exercise.reps.value),
            series: parseInt(exercise.series.value),
        } as Exercise;
        updateExercise(currentChart.id, id, newExercise);
        setIsEditting(false);
    };

    return {
        remove,
        update,
        isEditting,
        toggleEdit: () => setIsEditting(state => !state),
    };
};

export default useExerciseItem;
