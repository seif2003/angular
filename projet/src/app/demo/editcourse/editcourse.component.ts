import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, QCM, QCMOption } from 'src/models/course';
import { CourseService } from 'src/app/course.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-editcourse',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxEditorModule,ReactiveFormsModule],
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export default class EditcourseComponent implements OnInit, OnDestroy {
  editor: Editor;
  courseForm : FormGroup;
  error:string;
  success:string;
  id: string;


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

  constructor(private router: Router,private route: ActivatedRoute, private CoursesService: CourseService,private formBuilder:FormBuilder) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.CoursesService.getCourseById(Number(this.id)).subscribe(course1 => {
        this.initializeForm(course1)
      },
      error => {
        console.error('Error fetching course:', error);
        this.router.navigate(['/admin']);
      });
    });
    
  }

  initializeForm(course: Course): void {
    const correctOption = course.qcm.options.findIndex(option => option.correct);
    this.courseForm.patchValue({
      title: course.title,
      editor: course.lesson,
      question: course.qcm.question,
      o1: course.qcm.options[0]?.answer,
      o2: course.qcm.options[1]?.answer,
      o3: course.qcm.options[2]?.answer,
      c: correctOption >= 0 ? `o${correctOption + 1}` : null
    });
  }

  onSubmit(): void {
    console.log("ok")
    if (this.courseForm.valid) {
      console.log("ok2")
      const formValue = this.courseForm.value;
      const options: QCMOption[] = [
        new QCMOption(formValue.o1, formValue.c === 'o1'),
        new QCMOption(formValue.o2, formValue.c === 'o2'),
        new QCMOption(formValue.o3, formValue.c === 'o3')
      ];
      const qcm = new QCM(formValue.question, options);
      const course = new Course(Number(this.id), formValue.title, formValue.editor, qcm);
      this.CoursesService.updateCourse(course).subscribe(()=>{
        this.router.navigate(['/admin']);
      });
    }
    else{
      this.error = "Please fill out the form correctly.";
    }
  }
}

