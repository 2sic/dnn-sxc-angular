export interface SxcInstance {
    id: number;
    cbid: number;
    resolveServiceUrl(path: string): string;
}
