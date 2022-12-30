export const logLevelFormatter = (label: string, _: number): {level: string | number} => ({ level: label })

export const timestampFormatter = (): string => `,"time":"${new Date(Date.now()).toISOString()}"`
