import { act, renderHook } from '@testing-library/react';
import { useCharts } from '../../context';
import useTab from '../useTab';
import { CHARTS_MOCK } from '../../components/tests/mock';

const selectChart = jest.fn();
const renameChart = jest.fn();
jest.mock('../../context');
(useCharts as jest.Mock).mockReturnValue({
    currentChart: CHARTS_MOCK[0],
    selectChart,
    renameChart,
});

describe('useTab', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should render correctly', () => {
        const { result } = renderHook(() => useTab(0, 'Peito'));

        expect(result.current.isEditting).toBe(false);
        expect(result.current.inputValue).toBe('Peito');
        expect(result.current.isSelected).toBe(true);
    });

    it('should select according to currentChart', () => {
        const { result } = renderHook(() => useTab(1, 'Peito'));

        expect(result.current.isSelected).toBe(false);
    });

    it('should not select if already selected', () => {
        const { result } = renderHook(() => useTab(0, 'Peito'));
        act(() => result.current.select());

        expect(selectChart).not.toHaveBeenCalled();
        expect(result.current.isSelected).toBe(true);
    });

    it('should call select correctly', () => {
        const { result } = renderHook(() => useTab(1, 'Peito'));
        act(() => result.current.select());

        expect(selectChart).toHaveBeenCalledWith(1);
    });

    it('should call onEdit correctly', () => {
        const { result } = renderHook(() => useTab(1, 'Peito'));
        act(() => result.current.onEdit());

        expect(result.current.isEditting).toBe(true);
    });

    it('should call onChange correctly', () => {
        const { result } = renderHook(() => useTab(1, 'Peito'));
        act(() =>
            result.current.onChange({ target: { value: 'Perna' } } as any),
        );

        expect(result.current.inputValue).toBe('Perna');
    });

    it('should call onSave correctly', () => {
        const { result } = renderHook(() => useTab(1, 'Peito'));
        act(() =>
            result.current.onChange({ target: { value: 'Perna' } } as any),
        );
        act(() => result.current.onSave());

        expect(renameChart).toHaveBeenCalledWith(1, 'Perna');
        expect(result.current.isEditting).toBe(false);
    });
});
