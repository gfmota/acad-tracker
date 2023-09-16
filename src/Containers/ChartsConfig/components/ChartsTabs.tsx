import AddIcon from '../../../Components/Icons/AddIcon';
import { useCharts } from '../context';
import styles from './styles/ChartsTabs.module.scss';

const ChartsTabs = () => {
    const { charts, addChart, selectChart, currentChart } = useCharts();
    return (
        <div className={styles.container}>
            {charts.map(({ id, name }) => (
                <button
                    key={id}
                    className={`${styles.tab} ${
                        currentChart?.id === id ? styles.selected : ''
                    }`}
                    onClick={() => selectChart(id)}
                >
                    {name}
                </button>
            ))}
            <button onClick={addChart} className={styles.tab}>
                <AddIcon size="24" color="#3454b3" />
            </button>
        </div>
    );
};

export default ChartsTabs;
