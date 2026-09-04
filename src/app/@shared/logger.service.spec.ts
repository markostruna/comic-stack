import { Logger, LogLevel, LogOutput } from './logger.service';
import { vi } from 'vitest';

const logMethods = ['log', 'info', 'warn', 'error'];
const consoleRef = console as unknown as Record<string, (...args: unknown[]) => void>;

describe('Logger', () => {
  let savedConsole: Record<string, (...args: unknown[]) => void>;
  let savedLevel: LogLevel;
  let savedOutputs: LogOutput[];

  beforeAll(() => {
    savedConsole = {};
    logMethods.forEach((m) => {
      savedConsole[m] = consoleRef[m];
      consoleRef[m] = () => {};
    });
    savedLevel = Logger.level;
    savedOutputs = Logger.outputs;
  });

  beforeEach(() => {
    Logger.level = LogLevel.Debug;
  });

  afterAll(() => {
    logMethods.forEach((m) => {
      consoleRef[m] = savedConsole[m];
    });
    Logger.level = savedLevel;
    Logger.outputs = savedOutputs;
  });

  it('should create an instance', () => {
    expect(new Logger()).toBeTruthy();
  });

  it('should add a new LogOutput and receives log entries', () => {
    // Arrange
    const outputSpy = vi.fn();
    const log = new Logger('test');

    // Act
    Logger.outputs.push(outputSpy);

    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e', { error: true });

    // Assert
    expect(outputSpy).toHaveBeenCalled();
    expect(outputSpy).toHaveBeenCalledTimes(4);
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Debug, 'd');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Info, 'i');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Warning, 'w');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Error, 'e', { error: true });
  });

  it('should add a new LogOutput and receives only production log entries', () => {
    // Arrange
    const outputSpy = vi.fn();
    const log = new Logger('test');

    // Act
    Logger.outputs.push(outputSpy);
    Logger.enableProductionMode();

    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e', { error: true });

    // Assert
    expect(outputSpy).toHaveBeenCalled();
    expect(outputSpy).toHaveBeenCalledTimes(2);
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Warning, 'w');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Error, 'e', { error: true });
  });
});
