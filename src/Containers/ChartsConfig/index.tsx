import ChartsTabs from './components/ChartsTabs';
import EditChart from './components/EditChart';
import { ChartsProvider } from './context';

const ChartsConfig = () => (
    <ChartsProvider>
        <ChartsTabs />
        <EditChart />
    </ChartsProvider>
);

export default ChartsConfig;
