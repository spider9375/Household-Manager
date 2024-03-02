export interface IEnvironment {
    production: boolean,
    serverUrl: string,
}

export const environment: IEnvironment = {
    production: false,
    serverUrl: "http://localhost:8080",
}
