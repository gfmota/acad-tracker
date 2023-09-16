import { useCharts } from '../context';

const ChartsTabs = () => {
    const { charts, addChart, selectChart } = useCharts();
    return (
        <div>
            {charts.map(chart => (
                <button key={chart} onClick={() => selectChart(chart)}>
                    {chart}
                </button>
            ))}
            <button onClick={addChart}>+</button>
        </div>
    );
};

export default ChartsTabs;
