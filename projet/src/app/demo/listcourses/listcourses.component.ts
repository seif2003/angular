import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from 'src/app/course.service';
import { Course } from 'src/models/course';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as htmlToPdfmake from 'html-to-pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listcourses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listcourses.component.html',
  styleUrls: ['./listcourses.component.scss']
})
export default class ListcoursesComponent {
  courses: Course[];

  constructor(private CoursesService: CourseService) {}

  ngOnInit() {
    this.CoursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  public downloadAsPDF(course: Course) {
    const pdfTable = '<h1>' + course.title + '</h1><br>' + course.lesson; 
    const pdfContent = htmlToPdfmake(pdfTable);
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).open();
  }
}
