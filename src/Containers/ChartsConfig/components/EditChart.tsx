import useEditChart from '../hooks/useEditChart';
import ExerciseItem from './ExerciseItem';

const EditChart = () => {
    const { exercises, addExerciseToCurrentChart } = useEditChart();

    return (
        exercises && (
            <div>
                {exercises.map(exercise => (
                    <ExerciseItem key={exercise.id} exercise={exercise} />
                ))}
                <button onClick={addExerciseToCurrentChart}>+</button>
            </div>
        )
    );
};

export default EditChart;
