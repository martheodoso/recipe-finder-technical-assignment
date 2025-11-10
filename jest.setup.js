// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

global.console = {
  ...global.console,
  error: jest.fn()
}
