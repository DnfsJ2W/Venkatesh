import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../../Models/Student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any;
  public model: Student;
  headers = ["Id", "Name", "Marks"];
  addButtonClick:boolean = false;
  editButtonClick:boolean = false;

  buttonText: string = 'Add New Student';

  constructor(private service: StudentService) {
    this.model = new Student();
  }

  ngOnInit(): void {
  }

  getStudents()
  {
    this.service.getStudent()
    .subscribe(response => {
      this.students = response;
    });
  }

  getStudentById(Id: number)
  {
    console.log(Id);
    this.service.getStudentById(Id)
    .subscribe(response => {
      console.log('response',response)
      this.students = [];
      this.students = [response];
    },
    error=>{
      alert('record not exits...!')
    });
  }

  clickAddButton(){
    this.addButtonClick = true;
    this.buttonText = 'Add New Student';
  }

  addNewStudentOrUpdate(){
    if(this.addButtonClick == true) {
      this.service.addStudent(this.model)
    .subscribe(response => {
      console.log(response);
      alert('record inserted...!');
      this.getStudents();
      this.addButtonClick = false;
    })
    }

    if(this.editButtonClick == true) {
      this.service.updateStudent(this.model)
    .subscribe(response => {
      console.log(response);
      alert('record updated...!');
      this.getStudents();
      this.editButtonClick = false;
    })
    }

  }

  editClick(student: Student){
    this.editButtonClick = true;
    this.buttonText = 'Update Student';
    this.model.Id = student.Id;
    this.model.Name = student.Name;
    this.model.Marks = student.Marks;
  }

  deleteStudent(Id: number){
    this.service.deleteStudent(Id)
    .subscribe(response => {
      console.log(response);
      alert('record deleted...!');
      this.getStudents();
    })

  }

}
