export interface JsonRpcRequestInterface {
    method: string;
    params?: any[]|{};
    id?: string|number;
};


export class JsonRpcRequest {
    jsonrpc: string = '2.0';
    method: string = '';
    params: any[]|{}|null = null;
    id: string|number|undefined = undefined;

    constructor (config?: JsonRpcRequestInterface) {
        if (config) {
            if (config.method !== '')
                this.method = config.method;
            if (config.params !== undefined)
                this.params = config.params;
            if (config.id !== undefined)
                this.id = config.id;
        }
    };
};