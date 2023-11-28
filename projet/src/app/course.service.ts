import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:3000/courses';
  
  constructor(private http: HttpClient) { }

  public  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  public getCourseById(id: number): Observable<Course> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Course>(url);
  }

  public addCourses(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  public updateCourse(course: Course): Observable<Course> {
    const url = `${this.baseUrl}/${course.id}`;
    return this.http.put<Course>(url, course);
  }

  public deleteCourse(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  public getLastAvailableId(): Observable<number> {
    return this.getCourses().pipe(
      map(courses => Math.max(...courses.map(course => course.id)) + 1)
    );
  }
  
}
