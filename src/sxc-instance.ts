export interface SxcInstance {
    resolveServiceUrl(path: string) : string,
    id: number,
    cbid: number,
    isEditMode(): boolean,
}