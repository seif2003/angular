import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';


@Component({
  selector: 'app-edit-employee-dialog-component',
  templateUrl: './edit-employee-dialog-component.component.html',
  styleUrls: ['./edit-employee-dialog-component.component.css']
})
export class EditEmployeeDialogComponentComponent {
  editEmployeeForm: FormGroup;
  statusOptions: string[] = ['Active', 'Inactive'];

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editEmployeeForm = this.fb.group({
      name: [data.name, Validators.required],
      status: [data.status, Validators.required],
      id:[data.id]
    });
  }

  onUpdate(): void {
    if (this.editEmployeeForm.valid) {
      // Perform update logic here
      this.dialogRef.close(this.editEmployeeForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  /*
  public updateEmployee(): void {
    if (this.selectedEmployee) {
      const updatedEmployeeData = this.editEmployeeForm.value;
      updatedEmployeeData.status = updatedEmployeeData.status.toLowerCase();

      this.empService.updateEmployee({
        ...this.selectedEmployee,
        ...updatedEmployeeData
      }).subscribe(() => {
        this.loadEmployees();
        this.selectedEmployee = undefined;
        this.editEmployeeForm.reset();
      });
    }
  }
  
  */
}