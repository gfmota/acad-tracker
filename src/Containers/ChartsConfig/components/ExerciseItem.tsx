import { Exercise } from '../types';
import useExerciseItem from '../hooks/useExerciseItem';
import styles from './styles/ExerciseItem.module.scss';
import TrashIcon from '../../../Components/Icons/TrashIcon';
import EditIcon from '../../../Components/Icons/EditIcon';
import CancelIcon from '../../../Components/Icons/CancelIcon';
import SaveIcon from '../../../Components/Icons/SaveIcon';

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
          <button className={styles.iconButton} type="submit">
            <SaveIcon color="#3454b3" size="24" />
          </button>
          <button className={styles.iconButton} onClick={toggleEdit}>
            <CancelIcon color="red" size="24" />
          </button>
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
          <button className={styles.iconButton} onClick={toggleEdit}>
            <EditIcon color="#3454b3" size="24" />
          </button>
          <button className={styles.iconButton} onClick={remove}>
            <TrashIcon color="red" size="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;
