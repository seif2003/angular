import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from 'src/models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000/admin';
  
  constructor(private http: HttpClient) { }

  public getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl);
  }

  public addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admin);
  }

  public updateAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.baseUrl}/${admin.username}`, admin);
  }

}
