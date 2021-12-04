const {
    contextBridge,
    ipcRenderer
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("electron");
import { WHITELISTED } from './types/ipcTypes';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            const whitelistedRequestChannels = WHITELISTED.map(x => x.REQUEST);
            if (whitelistedRequestChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            const whitelistedReplyChannels = WHITELISTED.map(x => x.REPLY);
            if (whitelistedReplyChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);