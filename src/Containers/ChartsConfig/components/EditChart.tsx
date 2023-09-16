import AddIcon from '../../../Components/Icons/AddIcon';
import useEditChart from '../hooks/useEditChart';
import ExerciseItem from './ExerciseItem';
import styles from '../../../mixins.module.scss';

const EditChart = () => {
    const { exercises, addExerciseToCurrentChart } = useEditChart();

    return (
        exercises && (
            <div>
                {exercises.map(exercise => (
                    <ExerciseItem key={exercise.id} exercise={exercise} />
                ))}
                <button
                    className={styles.iconButton}
                    onClick={addExerciseToCurrentChart}
                >
                    <AddIcon size="32" color="#3454b3" />
                </button>
            </div>
        )
    );
};

export default EditChart;
