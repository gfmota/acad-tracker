import { useState } from 'react';
import { useCharts } from '../context';

const useTab = (id: number, name: string) => {
  const { currentChart, selectChart, renameChart } = useCharts();
  const [isEditting, setIsEditting] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const isSelected = currentChart.id === id;
  const select = () => !isSelected && selectChart(id);

  const onChange = (e: React.SyntheticEvent) => {
    setInputValue((e.target as any).value);
  };

  const onSave = () => {
    if (inputValue && name != inputValue) {
      renameChart(id, inputValue);
    }
    setIsEditting(false);
  };

  return {
    isEditting,
    isSelected,
    select,
    onEdit: () => setIsEditting(true),
    inputValue,
    onChange,
    onSave,
  };
};

export default useTab;
