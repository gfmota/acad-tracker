import { Exercise } from '../types';
import useExerciseItem from '../hooks/useExerciseItem';
import styles from './styles/ExerciseItem.module.scss';

interface ExerciseItemProps {
    exercise: Exercise;
}

const ExerciseItem = ({
    exercise: { id, name, series, reps },
}: ExerciseItemProps) => {
    const { remove, update, isEditting, toggleEdit } = useExerciseItem(id);
    return isEditting ? (
        <form onSubmit={update} className={styles.exercise}>
            <input
                type="text"
                name="name"
                defaultValue={name}
                className={styles.exerciseId}
                data-testid="name_input"
            />
            <div>
                <div className={styles.series_reps}>
                    <input
                        type="number"
                        name="series"
                        defaultValue={series}
                        data-testid="series_input"
                    />
                    x
                    <input
                        type="number"
                        name="reps"
                        defaultValue={reps}
                        data-testid="reps_input"
                    />
                </div>
                <div>
                    <button onClick={toggleEdit}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </div>
            </div>
        </form>
    ) : (
        <div className={styles.exercise}>
            <div className={styles.exerciseId}>{name}</div>
            <div>
                <div>
                    {series}x{reps}
                </div>
                <div>
                    <button onClick={toggleEdit}>Editar</button>
                    <button onClick={remove}>-</button>
                </div>
            </div>
        </div>
    );
};

export default ExerciseItem;
