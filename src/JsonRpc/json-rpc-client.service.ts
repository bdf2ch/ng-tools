import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JsonRpcRequest, JsonRpcRequestInterface } from './json-rpc-request.model';
import { JsonRpcResponse, JsonRpcResponseInterface} from "./json-rpc-response.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class JsonRpcClientService {
    private response: JsonRpcResponse|null = null;


    /**
     * Constructor
     * @param $http {Http} - injects Angular Http service
     */
    constructor (private $http: Http) {};


    /**
     * Call remote method on server
     * @param request {JsonRpcRequestIntarface} - Request options
     * @returns {Observable<T>}
     */
    call (request: JsonRpcRequestInterface) : Observable<JsonRpcResponse> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let parameters = request.params;
        return this.$http.post('dsd', parameters, options)
            .map((response: Response) => {
                let body = response.json();
                this.response = new JsonRpcResponse(body);
                console.info(this.response);
                return this.response;
            })
            .take(1);
    };


    /**
     * Returns the last response
     * @returns {JsonRpcResponse|null}
     */
    response (): JsonRpcResponse|null {
        return this.response;
    };

};