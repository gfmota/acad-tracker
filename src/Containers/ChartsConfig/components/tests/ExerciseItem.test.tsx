import { fireEvent, render, screen } from '@testing-library/react';
import ExerciseItem from '../ExerciseItem';
import { EXERCISES_MOCK } from './mock';
import useExerciseItem from '../../hooks/useExerciseItem';

const remove = jest.fn();
const update = jest.fn();
const toggleEdit = jest.fn();
jest.mock('../../hooks/useExerciseItem');
const mockUseExerciseItem = (isEditting?: boolean) =>
    (useExerciseItem as jest.Mock).mockReturnValue({
        remove,
        update,
        toggleEdit,
        isEditting,
    });

describe('ExerciseItem', () => {
    describe('not editting', () => {
        beforeEach(() => mockUseExerciseItem(false));
        it('should render the all exercises', () => {
            render(<ExerciseItem exercise={EXERCISES_MOCK[0]} />);

            expect(screen.getByText('Rosca')).toBeInTheDocument();
            expect(screen.getByText('4x12')).toBeInTheDocument();
        });

        it('should call toggleEdit correctly', () => {
            render(<ExerciseItem exercise={EXERCISES_MOCK[0]} />);
            fireEvent.click(screen.getByText('Editar'));

            expect(toggleEdit).toBeCalled();
        });

        it('should call remove correctly', () => {
            render(<ExerciseItem exercise={EXERCISES_MOCK[0]} />);
            fireEvent.click(screen.getByText('-'));

            expect(remove).toBeCalled();
        });
    });

    describe('editting', () => {
        beforeEach(() => mockUseExerciseItem(true));
        it('should render the all exercises', () => {
            render(<ExerciseItem exercise={EXERCISES_MOCK[0]} />);

            expect(screen.getByTestId('name_input')).toHaveValue('Rosca');
            expect(screen.getByTestId('series_input')).toHaveValue(4);
            expect(screen.getByTestId('reps_input')).toHaveValue(12);
        });

        it('should call toggleEdit correctly', () => {
            render(<ExerciseItem exercise={EXERCISES_MOCK[0]} />);
            fireEvent.click(screen.getByText('Cancelar'));

            expect(toggleEdit).toBeCalled();
        });

        it('should call update correctly', () => {
            render(<ExerciseItem exercise={EXERCISES_MOCK[0]} />);
            fireEvent.click(screen.getByText('Salvar'));

            expect(update).toBeCalled();
        });
    });
});
