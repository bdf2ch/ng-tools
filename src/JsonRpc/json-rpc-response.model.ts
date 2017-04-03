import {JsonRpcError, JsonRpcErrorInterface} from './json-rpc-error.model';


export interface JsonRpcResponseInterface {
    jsonrpc: string;
    result?: any;
    error?: JsonRpcErrorInterface;
    id: string|number|null;
};


export class JsonRpcResponse {
    jsonrpc: string = '2.0';

    constructor (config?: JsonRpcResponseInterface) {
        if (config) {
            if (config.result !== undefined && config.error === undefined) {
                Object.defineProperty(this, 'result', {
                    configurable: true,
                    enumerable: true,
                    value: config.result
                });
            }

            if (config.error !== undefined) {
                Object.defineProperty(this, 'error', {
                    configurable: true,
                    enumerable: true,
                    value: new JsonRpcError(config.error)
                });
            }
        }
    };
};
