import AddIcon from '../../../Components/Icons/AddIcon';
import { useCharts } from '../context';
import Tab from './Tab';
import styles from './styles/ChartsTabs.module.scss';

const ChartsTabs = () => {
  const { charts, addChart } = useCharts();
  return (
    <div className={styles.container}>
      {charts.map(({ id, name }) => (
        <Tab key={id} id={id} name={name} />
      ))}
      <button onClick={addChart} className={styles.tab}>
        <AddIcon size="24" color="#3454b3" />
      </button>
    </div>
  );
};

export default ChartsTabs;
