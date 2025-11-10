import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MealDescriptionPanel from './MealDescriptionPanel'

describe('MealDescriptionPanel', () => {
  it('renders component correclty', () => {
    const { container } = render(<MealDescriptionPanel description="anything" />)
    expect(container).toMatchSnapshot();

  })

  it('renders an empty paragraph when description is an empty string', () => {
    render(<MealDescriptionPanel description="" />)
    const paragraph = screen.getByTestId('meal-description');
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('')


  })


})