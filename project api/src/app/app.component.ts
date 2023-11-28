import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

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

  constructor(private empService: EmployeeService, private fb: FormBuilder) {
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

  public selectEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    this.editEmployeeForm.patchValue({
      name: this.selectedEmployee.name,
      status: this.selectedEmployee.status
    });
  }

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

  public deleteEmployee(employeeId: number): void {
    this.empService.deleteEmployee(employeeId).subscribe(() => {
      this.loadEmployees();
      this.selectedEmployee = undefined;
      this.editEmployeeForm.reset();
    });
  }
}
