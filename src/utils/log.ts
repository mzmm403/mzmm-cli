import logSymbols from 'log-symbols';

export const log = {
    success: (msg: string) => console.log(logSymbols.success, msg),
    error: (msg: string) => console.log(logSymbols.error, msg),
    info: (msg: string) => console.log(logSymbols.info, msg),
    warning: (msg: string) => console.log(logSymbols.warning, msg),
}

export default log