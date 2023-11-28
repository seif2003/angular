import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course} from 'src/models/course';
import { CourseService } from 'src/app/course.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export default class AdminComponent {
  id: string;
  courses : Course[];


  constructor(private route: ActivatedRoute, private CoursesService: CourseService) {
    this.refrech();
  }


  refrech(){
    this.route.paramMap.subscribe( () => {
      this.CoursesService.getCourses().subscribe(courses => {
        this.courses = courses;
      });
    });
  }

  reloadPage(){
    window.location.reload();
  }

  delete(id: number): void {
    this.CoursesService.deleteCourse(id).subscribe(() => {
      this.reloadPage()
    });
  }

}