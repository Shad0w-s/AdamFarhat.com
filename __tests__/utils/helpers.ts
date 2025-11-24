export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const createMockRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
})

