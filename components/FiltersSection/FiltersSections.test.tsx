import { render, screen, fireEvent } from '@testing-library/react';
import FiltersSection from './FiltersSections';


// Mock uuid to keep keys stable
jest.mock("uuid", () => ({ v4: () => "stable-uuid" }));

describe('FiltersSection', () => {
  const mockCuisineList = [
    { value: 'Italian', checked: false },
    { value: 'Mexican', checked: true },
  ];

  const mockAreaList = [
    { value: 'Europe', checked: false },
    { value: 'America', checked: true },
  ];

  const mockProps = {
    cuisineList: mockCuisineList,
    areaList: mockAreaList,
    areaFilters: ['Europe'],
    cuisineFilters: ['Italian'],
    handleCuiseineCheckBoxClick: jest.fn(),
    handleAreaCheckBoxClick: jest.fn(),
    handleResetClick: jest.fn()
  };

  test('renders filter panels with correct titles', () => {
    render(<FiltersSection {...mockProps} />);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Cuiseine / Area')).toBeInTheDocument();
  });

  test('renders reset button', () => {
    render(<FiltersSection {...mockProps} />);
    const resetButton = screen.getByText('Reset');
    expect(resetButton).toBeInTheDocument();
  });

  test('calls handleResetClick when reset button is clicked', () => {
    render(<FiltersSection {...mockProps} />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(mockProps.handleResetClick).toHaveBeenCalled();
  });

  test('initially hides apply button when JS is enabled', () => {
    render(<FiltersSection {...mockProps} />);
    const applyButton = screen.queryByText('Apply');
    expect(applyButton).not.toBeInTheDocument();
  });
});