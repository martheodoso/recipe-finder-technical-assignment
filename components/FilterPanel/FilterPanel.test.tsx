import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from './FilterPanel';
import { FilterDataType } from '@/lib/types';


// Mock uuid to keep keys stable
jest.mock("uuid", () => ({ v4: () => "stable-uuid" }));

const filterData: FilterDataType[] = [
  { value: 'Egg', checked: false },
  { value: 'Milk', checked: true },
];

describe('FilterPanel', () => {
  it.only('renders nothing if filterData is undefined', () => {
    const { container } = render(<FilterPanel filterData={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the panel with title and filters', () => {
    render(<FilterPanel filterData={filterData} title="Ingredients" />);
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
    expect(screen.getAllByTestId('filter')).toHaveLength(filterData.length);
    expect(screen.getByText('Egg')).toBeInTheDocument();
    expect(screen.getByText('Milk')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FilterPanel filterData={filterData} className="custom-class" />);
    const panel = screen.getByRole('group');
    expect(panel.parentElement).toHaveClass('custom-class');
  });

  it('checkboxes reflect checked state', () => {
    render(<FilterPanel filterData={filterData} />);
    expect(screen.getByTestId('checkbox-Egg')).not.toBeChecked();
    expect(screen.getByTestId('checkbox-Milk')).toBeChecked();
  });

  it('calls handleCheckBoxClick when checkbox is clicked', () => {
    const handleCheckBoxClick = jest.fn();
    render(<FilterPanel filterData={filterData} handleCheckBoxClick={handleCheckBoxClick} />);
    fireEvent.click(screen.getByTestId('checkbox-Egg'));
    expect(handleCheckBoxClick).toHaveBeenCalled();
  });
});