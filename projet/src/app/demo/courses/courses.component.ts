import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from 'src/app/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/models/course';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as htmlToPdfmake from 'html-to-pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export default class CoursesComponent {
  id: string;
  course : Course;
  courses : Course[];
  sanitizedLesson: SafeHtml;

  constructor(private sanitizer: DomSanitizer,private router: Router,private route: ActivatedRoute, private CoursesService: CourseService) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.CoursesService.getCourseById(Number(this.id)).subscribe(course => {
        this.course = course;
        this.sanitizedLesson = this.sanitizer.bypassSecurityTrustHtml(this.course.lesson);
      });
    });
  }
  navigateToCourse(courseId: number) {
    this.router.navigate(['/course/qcm', courseId.toString()]);
  }

  public downloadAsPDF() {
    const pdfTable = '<h1>' + this.course.title + '</h1><br>' + this.course.lesson; 
    const pdfContent = htmlToPdfmake(pdfTable);
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).open();
  }

}
