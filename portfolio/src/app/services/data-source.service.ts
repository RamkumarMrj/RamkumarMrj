import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment.development';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  getData() {
    const fullUrl = environment.baseUrl;
    return this.http.get(fullUrl);
  }
  
}
