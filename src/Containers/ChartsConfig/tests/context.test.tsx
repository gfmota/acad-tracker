import { renderHook, waitFor } from '@testing-library/react';
import { ChartsProvider, useCharts } from '../context';

const wrapper = ({ children }: any) => (
    <ChartsProvider>{children}</ChartsProvider>
);

describe('useCharts', () => {
    it('should create empty chart on addChart', async () => {
        const { result } = renderHook(useCharts, { wrapper });
        result.current.addChart();
        await waitFor(() =>
            expect(result.current.charts).toStrictEqual([
                'Nova ficha',
                'Nova ficha',
            ]),
        );
    });

    it('should delete chart on removeChart', async () => {
        const { result } = renderHook(useCharts, { wrapper });
        result.current.removeChart('Nova ficha');
        await waitFor(() => expect(result.current.charts).toStrictEqual([]));
    });

    it('should create empty exercise on addExercise', async () => {
        const { result } = renderHook(useCharts, { wrapper });
        result.current.addExercise('Nova ficha');
        await waitFor(() =>
            expect(result.current.currentChart).toStrictEqual({
                id: 'Nova ficha',
                exercises: [
                    {
                        id: 'Novo exercício',
                        pr: 0,
                        reps: 0,
                        series: 0,
                    },
                    {
                        id: 'Novo exercício',
                        pr: 0,
                        reps: 0,
                        series: 0,
                    },
                ],
            }),
        );
    });

    it('should delete exercise on removeExercise', async () => {
        const { result } = renderHook(useCharts, { wrapper });
        result.current.removeExercise('Nova ficha', 'Novo exercício');
        await waitFor(() =>
            expect(result.current.currentChart).toStrictEqual({
                id: 'Nova ficha',
                exercises: [],
            }),
        );
    });
});
