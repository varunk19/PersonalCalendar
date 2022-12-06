import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }
  
  login(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'login', data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'register', data);
  }

  getTodayPlans(): Observable<any>{
    let uname = localStorage.getItem("uname");
    let today = moment(new Date()).format("YYYY-MM-DD").toString();
    return this.http.get<any>(this.baseUrl+'getToday?username='+uname+'&date='+today);
  }

  getAllPlans(): Observable<any>{
    let uname = localStorage.getItem("uname");
    return this.http.get<any>(this.baseUrl+'getAll?username='+uname);
  }

  addEvent(data): Observable<any>{
    return this.http.post<any>(this.baseUrl+'addEvent', data);
  }

  updateEvent(data): Observable<any>{
    return this.http.put<any>(this.baseUrl+'updateEvent', data);
  }

  deleteEvent(data): Observable<any>{
    return this.http.delete<any>(this.baseUrl+'deleteEvent?id='+data.id);
  }
}


