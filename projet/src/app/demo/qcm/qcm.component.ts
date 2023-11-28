import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from 'src/app/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/models/course';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-qcm',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.scss']
})
export default class QcmComponent {
  id: string;
  course : Course;
  courses : Course[];

  constructor(private router: Router,private route: ActivatedRoute, private CoursesService: CourseService) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.CoursesService.getCourseById(Number(this.id)).subscribe(course => {
        this.course = course;
      });
    });
  }
  navigateToCourse(courseId: number) {
    this.router.navigate(['/course/qcm', courseId.toString()]);
  }
  selectedAnswer: string;
  answerChecked = false;
  isCorrect = false;
  checkAnswer() {
    this.answerChecked = true;
    this.isCorrect = this.course.qcm.options.find(option => option.answer === this.selectedAnswer)?.correct;
  }

}

