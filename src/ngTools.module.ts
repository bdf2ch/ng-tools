import { NgModule } from '@angular/core';
import { JsonRpcClientService } from './JsonRpc/json-rpc-client.service';


@NgModule({
    providers: [
        JsonRpcClientService
    ]
})
export class NgToolsModule {};