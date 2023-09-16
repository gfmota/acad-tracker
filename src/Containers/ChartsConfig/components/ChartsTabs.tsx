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
                +
            </button>
        </div>
    );
};

export default ChartsTabs;
