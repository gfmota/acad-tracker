import { useCharts } from '../context';
import { Exercise } from '../types';

const useEditChart = () => {
    const { currentChart, addExercise } = useCharts();

    const addExerciseToCurrentChart = () => addExercise(currentChart.id);

    return {
        exercises: currentChart?.exercises as Exercise[],
        addExerciseToCurrentChart,
    };
};

export default useEditChart;
