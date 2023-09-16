import { fireEvent, render, screen } from '@testing-library/react';
import ChartsTabs from '../ChartsTabs';
import { useCharts } from '../../context';
import { CHARTS_MOCK } from './mock';

const addChart = jest.fn();
const selectChart = jest.fn();
jest.mock('../../context');
(useCharts as jest.Mock).mockReturnValue({
    charts: CHARTS_MOCK,
    addChart,
    selectChart,
});

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

    it('should call selectChart correctly', () => {
        render(<ChartsTabs />);
        fireEvent.click(screen.getByText('B'));

        expect(selectChart).toBeCalledWith(1);
    });
});
