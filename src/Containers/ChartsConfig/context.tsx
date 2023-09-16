import React, { useContext, useMemo, useReducer } from 'react';
import { Chart, Exercise } from './types';

interface ChartsState {
    charts: Chart[];
    selected: string;
}
enum ActionsType {
    ADD_CHART = 'add_chart',
    REMOVE_CHART = 'remove_chart',
    ADD_EXERCISE = 'add_exercise',
    REMOVE_EXERCISE = 'remove_exercise',
    SELECT_CHART = 'select_chart',
}
interface Action {
    type: ActionsType;
    chartId?: string;
    exerciseId?: string;
    newChart?: Chart;
    newExercise?: Exercise;
}

const ChartsContext = React.createContext<
    { state: ChartsState; dispatch: (action: Action) => void } | undefined
>(undefined);

const chartsReducer = (state: ChartsState, action: Action) => {
    switch (action.type) {
        case ActionsType.ADD_CHART:
            if (!action.newChart)
                throw Error(
                    'newChart must be defined to ChartsContext.ADD_CHART',
                );
            return {
                ...state,
                charts: [...state.charts, action.newChart] as Chart[],
            };
        case ActionsType.REMOVE_CHART:
            if (!action.chartId)
                throw Error(
                    'chartId must be defined to ChartsContext.REMOVE_CHART',
                );
            return {
                ...state,
                charts: state.charts.filter(
                    ({ id }) => id != action.chartId,
                ) as Chart[],
            };
        case ActionsType.ADD_EXERCISE:
            if (!action.newExercise || !action.chartId)
                throw Error(
                    'newExercise and chartId must be defined to ChartsContext.ADD_EXERCISE',
                );
            return {
                ...state,
                charts: state.charts.map(chart =>
                    chart.id === action.chartId
                        ? {
                              ...chart,
                              exercises: [
                                  ...chart.exercises,
                                  action.newExercise,
                              ],
                          }
                        : chart,
                ) as Chart[],
            };
        case ActionsType.REMOVE_EXERCISE:
            if (!action.exerciseId || !action.chartId)
                throw Error(
                    'exerciseId and chartId must be defined to ChartsContext.REMOVE_EXERCISE',
                );
            return {
                ...state,
                charts: state.charts.map(chart =>
                    chart.id === action.chartId
                        ? {
                              ...chart,
                              exercises: chart.exercises.filter(
                                  ({ id }) => id != action.exerciseId,
                              ),
                          }
                        : chart,
                ) as Chart[],
            };
        case ActionsType.SELECT_CHART:
            if (!action.chartId)
                throw Error(
                    'chartId must be defined to ChartsContext.SELECT_CHART',
                );
            if (!state.charts.find(({ id }) => id === action.chartId))
                throw Error('chart selected not found');
            return {
                ...state,
                selected: action.chartId,
            };
    }
};

const initialState: ChartsState = {
    charts: [
        {
            id: 'Nova ficha',
            exercises: [
                {
                    id: 'Novo exercício',
                    pr: 0,
                    reps: 0,
                    series: 0,
                },
            ],
        },
    ],
    selected: 'Nova ficha',
};

export const ChartsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(chartsReducer, initialState);
    return (
        <ChartsContext.Provider value={{ state, dispatch }}>
            {children}
        </ChartsContext.Provider>
    );
};

export const useCharts = () => {
    const context = useContext(ChartsContext);
    if (!context) throw Error('ChartsContext is not acessible here');
    const { state, dispatch } = context;

    const addChart = () => {
        const newChart: Chart = {
            id: 'Nova ficha',
            exercises: [] as Exercise[],
        };
        dispatch({
            type: ActionsType.ADD_CHART,
            newChart,
        });
    };

    const removeChart = (chartId: string) => {
        dispatch({
            type: ActionsType.REMOVE_CHART,
            chartId,
        });
    };

    const addExercise = (chartId: string) => {
        const newExercise: Exercise = {
            id: 'Novo exercício',
            series: 0,
            reps: 0,
            pr: 0,
        };
        dispatch({
            type: ActionsType.ADD_EXERCISE,
            chartId,
            newExercise,
        });
    };

    const removeExercise = (chartId: string, exerciseId: string) => {
        dispatch({
            type: ActionsType.REMOVE_EXERCISE,
            chartId,
            exerciseId,
        });
    };

    const selectChart = (chartId: string) => {
        dispatch({
            type: ActionsType.SELECT_CHART,
            chartId,
        });
    };

    const charts = useMemo(
        () => state.charts.map(({ id }) => id),
        [state.charts],
    );

    return {
        charts,
        currentChart: state.charts.find(({ id }) => id === state.selected),
        addChart,
        removeChart,
        addExercise,
        removeExercise,
        selectChart,
    };
};
