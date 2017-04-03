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
     * Send request to remote server
     * @param request {JsonRpcRequestIntarface} - Request options
     * @returns {Observable<T>}
     */
    request(request: JsonRpcRequestInterface): Observable<JsonRpcResponse> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.$http.post('dsd', request, options)
            .map((response: Response) => {
                let body = response.json();
                this.response = new JsonRpcResponse(body);
                console.info(this.response);
                return this.response;
            })
            .take(1);
    };


    /**
     * Send batch of requests to server
     * @param requests {JsonRpcRequest[]} - array of requests
     * @returns {Observable<T>}
     */
    batch(requests: JsonRpcRequestInterface[]): Observable<JsonRpcResponse[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = RequestOptions({ headers: headers });

        return this.$http.post('ddd', requests, options)
            .map((response: Response) => {
                let body = response.json();
                let length = body.length;
                let result = [];
                for (let i = 0; i < length; i++) {
                    let jsonRpcResponse = new JsonRpcResponse(body[i]);
                    result.push(jsonRpcResponse);
                }
                return result;
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