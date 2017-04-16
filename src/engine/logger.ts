export enum LogLevel {
   Debug,
   Info,
   Warn,
   Error,
   Fatal
}

export class Logger {
   private static _instance: Logger = null;

   constructor() {
      if (Logger._instance) {
         throw new Error('Logger is a singleton');
      }
      Logger._instance = this;
      return Logger._instance;
   }

   public defaultLevel: LogLevel = LogLevel.Info;

   public static getInstance(): Logger {
      if (Logger._instance == null) {

         Logger._instance = new Logger();
      }
      return Logger._instance;
   }

   private _log(level: LogLevel, args: any[]): void {
      if (level == null) {
         level = this.defaultLevel;
      }

      // Create a new console args array
      var consoleArgs: any[] = [];
      consoleArgs.unshift.apply(consoleArgs, args);
      consoleArgs.unshift('[' + LogLevel[level] + '] : ');

      if (level < LogLevel.Warn) {

         // Call .log for Debug/Info
         if (console.log.apply) {
            // this is required on some older browsers that don't support apply on console.log :(
            console.log.apply(console, consoleArgs);
         } else {
            console.log(consoleArgs.join(' '));
         }
      } else if (level < LogLevel.Error) {

         // Call .warn for Warn
         if (console.warn.apply) {
            console.warn.apply(console, consoleArgs);
         } else {
            console.warn(consoleArgs.join(' '));
         }
      } else {

         // Call .error for Error/Fatal
         if (console.error.apply) {
            console.error.apply(console, consoleArgs);
         } else {
            console.error(consoleArgs.join(' '));
         }
      }
   }

   public debug(...args: any[]): void {
      this._log(LogLevel.Debug, args);
   }

   public info(...args: any[]): void {
      this._log(LogLevel.Info, args);
   }

   public warn(...args: any[]): void {
      this._log(LogLevel.Warn, args);
   }

   public error(...args: any[]): void {
      this._log(LogLevel.Error, args);
   }

   public fatal(...args: any[]): void {
      this._log(LogLevel.Fatal, args);
   }
}
