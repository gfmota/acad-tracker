import { fireEvent, render, screen } from '@testing-library/react';
import Tab from '../Tab';
import useTab from '../../hooks/useTab';

const select = jest.fn();
const onEdit = jest.fn();
const onSave = jest.fn();
jest.mock('../../hooks/useTab');
const mockUseTab = (
    isSelected = true,
    isEditting = false,
    inputValue = 'inputValue',
) =>
    (useTab as jest.Mock).mockReturnValue({
        isSelected,
        select,
        isEditting,
        onEdit,
        inputValue,
        onChange: jest.fn(),
        onSave,
    });

describe('Tab', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should render selected correctly', () => {
        mockUseTab();
        render(<Tab id={0} name="Peito" />);

        expect(screen.getByText('Peito')).toBeInTheDocument();
        expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    });

    it('should render not selected correctly', () => {
        mockUseTab(false);
        render(<Tab id={0} name="Peito" />);

        expect(screen.getByText('Peito')).toBeInTheDocument();
        expect(screen.queryByTestId('edit-icon')).toBeNull();
    });

    it('should render editting correctly', () => {
        mockUseTab(true, true);
        render(<Tab id={0} name="Peito" />);

        expect(screen.getByTestId('save-icon')).toBeInTheDocument();
        expect(screen.getByTestId('tab-input')).toHaveValue('inputValue');
    });

    it('should call onEdit  correctly', () => {
        mockUseTab();
        render(<Tab id={0} name="Peito" />);
        fireEvent.click(screen.getByTestId('edit-icon'));

        expect(onEdit).toBeCalled();
    });

    it('should call select correctly', () => {
        mockUseTab(false);
        render(<Tab id={0} name="Peito" />);
        fireEvent.click(screen.getByText('Peito'));

        expect(select).toBeCalled();
    });

    it('should call onSave correctly', () => {
        mockUseTab(true, true);
        render(<Tab id={0} name="Peito" />);
        fireEvent.click(screen.getByTestId('save-icon'));

        expect(onSave).toBeCalled();
    });
});
