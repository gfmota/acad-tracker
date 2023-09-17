import styles from './styles/ChartsTabs.module.scss';
import EditIcon from '../../../Components/Icons/EditIcon';
import useTab from '../hooks/useTab';
import SaveIcon from '../../../Components/Icons/SaveIcon';

interface TabProps {
    id: number;
    name: string;
}

const Tab = ({ id, name }: TabProps) => {
    const {
        isSelected,
        select,
        isEditting,
        onEdit,
        inputValue,
        onChange,
        onSave,
    } = useTab(id, name);
    return (
        <div
            className={`${styles.tab} ${isSelected ? styles.selected : ''}`}
            onClick={select}
        >
            {isEditting ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={onChange}
                    data-testid="tab-input"
                />
            ) : (
                <div>{name}</div>
            )}
            {isSelected && (
                <button
                    className={styles.iconButton}
                    onClick={isEditting ? onSave : onEdit}
                >
                    {isEditting ? (
                        <SaveIcon size="16" color="#3454b3" />
                    ) : (
                        <EditIcon size="16" color="#3454b3" />
                    )}
                </button>
            )}
        </div>
    );
};

export default Tab;
