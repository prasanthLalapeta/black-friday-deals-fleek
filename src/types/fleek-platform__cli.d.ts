declare module '@fleek-platform/cli' {
    export interface FleekConfig {
        // Using a more specific type instead of 'any'
        [key: string]: string | number | boolean | object | undefined;
    }
} 