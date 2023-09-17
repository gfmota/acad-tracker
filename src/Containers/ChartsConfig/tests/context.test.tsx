import { act, renderHook } from '@testing-library/react';
import { ChartsProvider, useCharts } from '../context';

const wrapper = ({ children }: any) => (
    <ChartsProvider>{children}</ChartsProvider>
);

describe('useCharts', () => {
    it('should create empty chart on addChart', () => {
        const { result } = renderHook(useCharts, { wrapper });
        act(() => result.current.addChart());

        expect(result.current.charts).toStrictEqual([
            {
                id: 0,
                name: 'Nova ficha',
                exercises: [],
            },
            {
                id: 1,
                name: 'Nova ficha1',
                exercises: [],
            },
        ]);
    });

    it('should delete chart on removeChart', () => {
        const { result } = renderHook(useCharts, { wrapper });
        act(() => result.current.removeChart(0));
        expect(result.current.charts).toStrictEqual([]);
    });

    it('should create empty exercise on addExercise', () => {
        const { result } = renderHook(useCharts, { wrapper });
        act(() => result.current.addExercise(0));

        expect(result.current.currentChart).toStrictEqual({
            name: 'Nova ficha',
            id: 0,
            exercises: [
                {
                    id: 0,
                    name: 'Novo exercício',
                    reps: 0,
                    series: 0,
                },
            ],
        });
    });

    it('should delete exercise on removeExercise', () => {
        const { result } = renderHook(useCharts, { wrapper });
        act(() => {
            result.current.addExercise(0);
        });
        act(() => {
            result.current.addExercise(0);
        });
        act(() => {
            result.current.removeExercise(0, 0);
        });

        expect(result.current.currentChart).toStrictEqual({
            name: 'Nova ficha',
            id: 0,
            exercises: [
                {
                    id: 1,
                    name: 'Novo exercício1',
                    reps: 0,
                    series: 0,
                },
            ],
        });
    });

    it('should selectChart correctly', () => {
        const { result } = renderHook(useCharts, { wrapper });
        act(() => result.current.addChart());
        act(() => result.current.selectChart(0));

        expect(result.current.currentChart).toStrictEqual({
            id: 0,
            name: 'Nova ficha',
            exercises: [],
        });

        expect(result.current.charts).toStrictEqual([
            {
                id: 0,
                name: 'Nova ficha',
                exercises: [],
            },
            {
                id: 1,
                name: 'Nova ficha1',
                exercises: [],
            },
        ]);
    });

    it('should updateExercise correctly', () => {
        const { result } = renderHook(useCharts, { wrapper });
        const newExercise = {
            id: 0,
            name: 'Rosca',
            reps: 12,
            series: 3,
        };
        act(() => result.current.addExercise(0));
        act(() => result.current.updateExercise(0, 0, newExercise));

        expect(result.current.charts).toStrictEqual([
            {
                id: 0,
                name: 'Nova ficha',
                exercises: [newExercise],
            },
        ]);
    });

    it('should renameChart correctly', () => {
        const { result } = renderHook(useCharts, { wrapper });
        act(() => result.current.renameChart(0, 'A'));

        expect(result.current.charts).toStrictEqual([
            {
                id: 0,
                name: 'A',
                exercises: [],
            },
        ]);
    });
});
