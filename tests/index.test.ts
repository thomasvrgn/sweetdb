import Index from 'src/index';

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  ...global.console,
};

describe('#Index file', () => {
  test('should log some texts', () => {
    const spy: jest.SpyInstance = jest.spyOn(console, 'log').mockImplementation();
    Index();
    expect(spy).toHaveBeenLastCalledWith('Hello world from Typescript template!');
    spy.mockRestore();
  });
});