import { act, renderHook } from '@testing-library/react';
import { useCharts } from '../../context';
import useExerciseItem from '../useExerciseItem';
import { CHARTS_MOCK } from '../../components/tests/mock';

const removeExercise = jest.fn();
const updateExercise = jest.fn();
jest.mock('../../context');
(useCharts as jest.Mock).mockReturnValue({
    removeExercise,
    currentChart: CHARTS_MOCK[0],
    updateExercise,
});

describe('useExerciseItem', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should call remove correctly', () => {
        const { result } = renderHook(() => useExerciseItem(1));
        act(() => result.current.remove());

        expect(removeExercise).toHaveBeenCalledWith(0, 1);
    });

    it('should call update correctly', () => {
        const { result } = renderHook(() => useExerciseItem(1));
        const preventDefault = jest.fn();
        const event = {
            preventDefault,
            target: {
                name: { value: 'Rosca martelo' },
                reps: { value: '12' },
                series: { value: '3' },
            },
        };
        act(() => result.current.update(event as any));

        expect(preventDefault).toHaveBeenCalled();
        expect(updateExercise).toHaveBeenCalledWith(0, 1, {
            id: 1,
            name: 'Rosca martelo',
            reps: 12,
            series: 3,
        });
    });

    it('should fail update if there is exercise with the same name', () => {
        const { result } = renderHook(() => useExerciseItem(1));
        const preventDefault = jest.fn();
        const event = {
            preventDefault,
            target: {
                name: { value: 'Rosca' },
                reps: { value: '12' },
                series: { value: '3' },
            },
        };
        act(() => result.current.update(event as any));

        expect(preventDefault).toHaveBeenCalled();
        expect(updateExercise).not.toHaveBeenCalled();
    });
});
