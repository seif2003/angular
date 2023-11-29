import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, QCM, QCMOption } from 'src/models/course';
import { CourseService } from 'src/app/course.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-addcourse',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxEditorModule,ReactiveFormsModule],
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export default class AddcourseComponent implements OnInit, OnDestroy {
  editor: Editor;
  courseForm : FormGroup;
  error:string;


  ngOnInit(): void {
    this.editor = new Editor();
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[^%$#]{4,}$')]],
      editor: ['', [Validators.required]],
      question: ['', [Validators.required, Validators.pattern('^[^%$#]{4,}$')]],
      o1: ['', [Validators.required, Validators.pattern('^[^%$#]{4,}$')]],
      o2: ['', [Validators.required, Validators.pattern('^[^%$#]{4,}$')]],
      o3: ['', [Validators.required, Validators.pattern('^[^%$#]{4,}$')]],
      c: ['', Validators.required]
    })    
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  constructor( private CoursesService: CourseService,private formBuilder:FormBuilder) {
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const formValue = this.courseForm.value;
      const options: QCMOption[] = [
        new QCMOption(formValue.o1, formValue.c === 'o1'),
        new QCMOption(formValue.o2, formValue.c === 'o2'),
        new QCMOption(formValue.o3, formValue.c === 'o3')
      ];
      const qcm = new QCM(formValue.question, options);
      const course = new Course(0, formValue.title, formValue.editor, qcm);
      this.CoursesService.addCourses(course).subscribe(() => {
        this.courseForm.reset();
      });
    }
    else{
      this.error = "Please fill out the form correctly.";
    }
  }
}
