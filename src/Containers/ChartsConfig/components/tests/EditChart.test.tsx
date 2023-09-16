import { fireEvent, render, screen } from '@testing-library/react';
import EditChart from '../EditChart';
import { EXERCISES_MOCK } from './mock';
import useEditChart from '../../hooks/useEditChart';
import ExerciseItem from '../ExerciseItem';

const addExerciseToCurrentChart = jest.fn();
jest.mock('../../hooks/useEditChart');
(useEditChart as jest.Mock).mockReturnValue({
    exercises: EXERCISES_MOCK,
    addExerciseToCurrentChart,
});
jest.mock('../ExerciseItem');
(ExerciseItem as jest.Mock).mockImplementation(({ exercise: { name } }) => (
    <div>{name}</div>
));

describe('EditChart', () => {
    it('should render the all exercises', () => {
        render(<EditChart />);

        expect(screen.getByText('Rosca')).toBeInTheDocument();
        expect(screen.getByText('Desenvolvimento')).toBeInTheDocument();
    });

    it('should call addChart correctly', () => {
        render(<EditChart />);
        fireEvent.click(screen.getByTestId('add-icon'));

        expect(addExerciseToCurrentChart).toBeCalled();
    });
});
