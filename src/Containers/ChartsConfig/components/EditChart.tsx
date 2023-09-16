import { useCharts } from '../context';

const EditChart = () => {
    const { currentChart, addExercise, removeExercise } = useCharts();
    return (
        currentChart && (
            <div>
                {currentChart.exercises.map(({ id, pr, series, reps }) => (
                    <div key={id}>
                        {id} {series}x{reps} PR: {pr} <button>Editar</button>
                        <button
                            onClick={() => removeExercise(currentChart.id, id)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button onClick={() => addExercise(currentChart.id)}>+</button>
            </div>
        )
    );
};

export default EditChart;
