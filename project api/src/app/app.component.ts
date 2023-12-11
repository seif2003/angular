import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponentComponent } from './edit-employee-dialog-component/edit-employee-dialog-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  employees: Employee[] = [];
  employeeForm: FormGroup;
  editEmployeeForm: FormGroup;
  selectedEmployee: Employee | undefined;
  statusOptions: string[] = ['Active', 'Inactive'];
  number_employees:Number;

  constructor(private empService: EmployeeService, private fb: FormBuilder,private dialog: MatDialog) {
    this.employeeForm = this.createEmployeeForm();
    this.editEmployeeForm = this.createEmployeeForm();

    this.loadEmployees();
  }

  private createEmployeeForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  

  private loadEmployees(): void {
    this.empService.getEmployees().subscribe(response => {
      this.employees = response.map(item => new Employee(item.id, item.name, item.status));
      this.number_employees = this.employees.length;
    });
  }

  public addEmployee(): void {
    const newEmployeeData = this.employeeForm.value;
    newEmployeeData.status = newEmployeeData.status.toLowerCase();

    this.empService.addEmployee(newEmployeeData).subscribe(() => {
      this.loadEmployees();
      this.employeeForm.reset();
    });
  }

  selectEmployee(employee: any): void {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponentComponent, {
      width: '400px',
      data: { name: employee.name, status: employee.status,id:employee.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEmployee(result);
      }
    });
  }

  public updateEmployee(selectedEmployee): void {
    if (selectedEmployee) {
      this.empService.updateEmployee({
        ...selectedEmployee,
      }).subscribe(() => {
        this.loadEmployees();
        selectedEmployee = undefined;
      });
    }
  }

  public deleteEmployee(employeeId: number): void {
    this.empService.deleteEmployee(employeeId).subscribe(() => {
      this.loadEmployees();
      this.selectedEmployee = undefined;
      this.editEmployeeForm.reset();
    });
  }
}
