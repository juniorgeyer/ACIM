import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ServiceProvider {

	api: string = 'http://www.acimmaraba.com.br/';

  constructor(public http: HttpClient) {
      }

    getData(){
    	return this.http.get(this.api+ 'lerdados.php').map(res=> res);
    }
  	

}
