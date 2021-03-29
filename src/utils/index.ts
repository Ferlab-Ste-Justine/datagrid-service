import { KeyValuePairs } from '../types';

export function getOsEnv(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

export function getOsEnvOptional(key: string, defaultValue: string = undefined): string | undefined {
    return process.env[key] ? process.env[key] : defaultValue;
}

export function getOsEnvArray(key: string, delimiter = ','): string[] {
    return (process.env[key] && process.env[key].split(delimiter)) || [];
}

export function toNumber(value: string): number {
    return parseInt(value, 10);
}

export function toBool(value: string): boolean {
    return value === 'true';
}

export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) {
        // named pipe
        return port;
    }
    if (parsedPort >= 0) {
        // port number
        return parsedPort;
    }
    return false;
}

export function getKeysEndingWith(suffix: string): KeyValuePairs {
    const map: KeyValuePairs = {};

    Object.keys(process.env)
        .filter((key) => key.endsWith(suffix))
        .forEach((key) => {
            map[key.substring(0, key.lastIndexOf(suffix)).toLowerCase()] = process.env[key];
        });

    return map;
}
