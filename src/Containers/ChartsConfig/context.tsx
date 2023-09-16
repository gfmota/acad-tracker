import React, { useContext, useReducer } from 'react';
import { Chart, Exercise } from './types';

interface ChartsState {
    charts: Chart[];
    selected: number;
}
enum ActionsType {
    ADD_CHART = 'add_chart',
    REMOVE_CHART = 'remove_chart',
    ADD_EXERCISE = 'add_exercise',
    REMOVE_EXERCISE = 'remove_exercise',
    UPDATE_EXERCISE = 'update_exercise',
    SELECT_CHART = 'select_chart',
}
interface Action {
    type: ActionsType;
    chartId?: number;
    exerciseId?: number;
    newChart?: Chart;
    exercise?: Exercise;
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
                selected: action.newChart.id,
            };
        case ActionsType.REMOVE_CHART:
            if (action.chartId === undefined)
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
            if (!action.exercise || action.chartId === undefined)
                throw Error(
                    'exercise and chartId must be defined to ChartsContext.ADD_EXERCISE',
                );
            return {
                ...state,
                charts: state.charts.map(chart =>
                    chart.id === action.chartId
                        ? {
                              ...chart,
                              exercises: [...chart.exercises, action.exercise],
                          }
                        : chart,
                ) as Chart[],
            };
        case ActionsType.REMOVE_EXERCISE:
            if (action.exerciseId === undefined || action.chartId === undefined)
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
        case ActionsType.UPDATE_EXERCISE:
            if (
                action.chartId === undefined ||
                action.exerciseId === undefined ||
                !action.exercise
            )
                throw Error(
                    'chartId, exerciseId and exercise must be defined to ChartsContext.SELECT_CHART',
                );
            return {
                ...state,
                charts: state.charts.map(chart =>
                    chart.id === action.chartId
                        ? {
                              ...chart,
                              exercises: chart.exercises.map(exercise =>
                                  exercise.id == action.exerciseId
                                      ? action.exercise
                                      : exercise,
                              ),
                          }
                        : chart,
                ) as Chart[],
            };
        case ActionsType.SELECT_CHART:
            if (action.chartId === undefined)
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
            name: 'Nova ficha',
            id: 0,
            exercises: [],
        },
    ],
    selected: 0,
};

export const ChartsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(chartsReducer, initialState);
    return (
        <ChartsContext.Provider value={{ state, dispatch }}>
            {children}
        </ChartsContext.Provider>
    );
};

const generateNewId = (list: { id: number }[]) =>
    list.length ? list[list.length - 1].id + 1 : 0;

const getUniqueName = (initialName: string, list?: { name: string }[]) => {
    let newName = initialName;
    let index = 1;
    while (!list || list.find(({ name }) => name === newName)) {
        newName = `${initialName}${index}`;
        index++;
    }
    return newName;
};

export const useCharts = () => {
    const context = useContext(ChartsContext);
    if (!context) throw Error('ChartsContext is not acessible here');
    const { state, dispatch } = context;

    const currentChart = state.charts.find(
        ({ id }) => id === state.selected,
    ) as Chart;

    const addChart = () => {
        const newChartId = generateNewId(state.charts);
        const newChartName = getUniqueName('Nova ficha', state.charts);
        const newChart: Chart = {
            id: newChartId,
            name: newChartName,
            exercises: [] as Exercise[],
        };
        dispatch({
            type: ActionsType.ADD_CHART,
            newChart,
        });
    };

    const removeChart = (chartId: number) => {
        dispatch({
            type: ActionsType.REMOVE_CHART,
            chartId,
        });
    };

    const addExercise = (chartId: number) => {
        const chart = state.charts.find(({ id }) => id === chartId) as Chart;
        const newExerciseId = generateNewId(chart.exercises);
        const newExerciseName = getUniqueName(
            'Novo exercício',
            chart.exercises,
        );
        const exercise: Exercise = {
            id: newExerciseId,
            name: newExerciseName,
            series: 0,
            reps: 0,
        };
        dispatch({
            type: ActionsType.ADD_EXERCISE,
            chartId,
            exercise,
        });
    };

    const removeExercise = (chartId: number, exerciseId: number) => {
        dispatch({
            type: ActionsType.REMOVE_EXERCISE,
            chartId,
            exerciseId,
        });
    };

    const updateExercise = (
        chartId: number,
        exerciseId: number,
        exercise: Exercise,
    ) => {
        dispatch({
            type: ActionsType.UPDATE_EXERCISE,
            chartId,
            exerciseId,
            exercise,
        });
    };

    const selectChart = (chartId: number) => {
        dispatch({
            type: ActionsType.SELECT_CHART,
            chartId,
        });
    };

    return {
        charts: state.charts,
        currentChart,
        addChart,
        removeChart,
        addExercise,
        removeExercise,
        selectChart,
        updateExercise,
    };
};
