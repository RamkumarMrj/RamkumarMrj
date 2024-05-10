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

  // downloadPdf(): void {
  //   const url = environment.resume;
  //   this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
  //     const blob = new Blob([response], { type: 'application/pdf' });
  //     const downloadUrl = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     const currentDate = new Date();
  //     const dateString = currentDate.toISOString().slice(0, 10);
  //     link.href = downloadUrl;
  //     link.download = `Ramkummar-Murthy-${dateString}.pdf`;
  //     link.click();
  //   });
  // }
  
}
