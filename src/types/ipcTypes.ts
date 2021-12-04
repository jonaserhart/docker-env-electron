interface IpcModel {
    REQUEST: string;
    REPLY: string;
}

export const CHANGE_CONFIG: IpcModel = {
    REQUEST: 'change-config-global',
    REPLY: 'change-config-global-reply'
}

export const WHITELISTED = [
    CHANGE_CONFIG,
]

export type IpcMainFunction<T> = (event: Electron.IpcMainEvent, data: T) => void;