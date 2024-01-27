import { fireEvent, render, screen } from '@testing-library/react';
import ChartsTabs from '../ChartsTabs';
import { useCharts } from '../../context';
import { CHARTS_MOCK } from './mock';
import Tab from '../Tab';

const addChart = jest.fn();
jest.mock('../../context');
(useCharts as jest.Mock).mockReturnValue({
  charts: CHARTS_MOCK,
  addChart,
});
jest.mock('../Tab');
(Tab as jest.Mock).mockImplementation(({ name }) => <div>{name}</div>);

describe('ChartsTabs', () => {
  it('should render the all charts in tabs and add button', () => {
    render(<ChartsTabs />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
  });

  it('should call addChart correctly', () => {
    render(<ChartsTabs />);
    fireEvent.click(screen.getByTestId('add-icon'));

    expect(addChart).toBeCalled();
  });
});
