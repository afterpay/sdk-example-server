import * as dotenv from 'dotenv';
dotenv.config({ override: true });

type LogLevel = 'LOG' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'
const logLevel = process.env.LOG_LEVEL as LogLevel || 'WARN'

const logLevelMappping: Record<LogLevel, number> = {
  'LOG': 0,
  'DEBUG': 1,
  'INFO': 2,
  'WARN': 3,
  'ERROR': 4,
}

const logLevelColorMapping: Record<LogLevel, string> = {
  'LOG': '\x1b[34m',
  'DEBUG': '\x1b[34m',
  'INFO': '\x1b[32m',
  'WARN': '\x1b[33m',
  'ERROR': '\x1b[31m',
}

export class LOGGER {
  static log(...message: any) {
    this.emitLogMessage('LOG', ...message);
  }

  static debug(...message: any) {
    if (this.isUnderLogLevel('DEBUG'))
      this.emitLogMessage('DEBUG', ...message);
  }

  static info(...message: any) {
    if (this.isUnderLogLevel('INFO'))
      this.emitLogMessage('INFO', ...message);
  }

  static warn(...message: any) {
    if (this.isUnderLogLevel('WARN'))
      this.emitLogMessage('WARN', ...message);
  }

  static error(...message: any) {
    if (this.isUnderLogLevel('ERROR'))
      this.emitLogMessage('ERROR', ...message);
  }

  static isUnderLogLevel(typeLevel: LogLevel) {
    return logLevelMappping[typeLevel] >= logLevelMappping[logLevel] || logLevelMappping[typeLevel] === 0;
  }

  static colorizeLogText(level: LogLevel, message: string) {
    return `${logLevelColorMapping[level]}${message}\x1b[0m`;
  }

  static emitLogMessage(level: LogLevel, ...message: any[]) {
    const levelText = `[${level}]:`;
    const coloredLevelText = this.colorizeLogText(level, levelText).padEnd(17, ' ');

    switch(level) {
      case 'LOG':
        console.log(coloredLevelText, ...message);
        break;
      case 'DEBUG':
        console.debug(coloredLevelText, ...message);
        break;
      case 'INFO':
        console.info(coloredLevelText, ...message);
        break;
      case 'WARN':
        console.warn(coloredLevelText, ...message);
        break;
      case 'ERROR':
        console.error(coloredLevelText, ...message);
        break;
    }
  }
}
