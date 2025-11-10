// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn()
}
