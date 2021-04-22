import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../Models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'https://localhost:44379/api/Students/';

  constructor(public http: HttpClient) {

  }

  getStudent(){
    return this.http.get(this.url);
  }

  getStudentById(Id:number){
    return this.http.get(this.url + Id);
  }

  addStudent(data: Student){
    return this.http.post(this.url, data);
  }

  updateStudent(data:Student){
    return this.http.put(this.url + data.Id, data);
  }

  deleteStudent(id: number){
    return this.http.delete(this.url + id)
  }
}
