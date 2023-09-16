import { useCharts } from '../context';
import styles from './styles/ChartsTabs.module.scss';

const ChartsTabs = () => {
    const { charts, addChart, selectChart, currentChart } = useCharts();
    return (
        <div className={styles.container}>
            {charts.map(chart => (
                <button
                    key={chart}
                    className={`${styles.tab} ${
                        currentChart?.id === chart ? styles.selected : ''
                    }`}
                    onClick={() => selectChart(chart)}
                >
                    {chart}
                </button>
            ))}
            <button onClick={addChart} className={styles.tab}>
                +
            </button>
        </div>
    );
};

export default ChartsTabs;
