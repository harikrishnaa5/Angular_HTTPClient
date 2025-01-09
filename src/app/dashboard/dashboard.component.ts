import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateTaskComponent } from "./create-task/create-task.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent{
  showCreateTaskForm: boolean = false;

  http: HttpClient = inject(HttpClient)

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  CreateTask(data: Task){
    const headers = new HttpHeaders({"my-header": "my-header"})
    this.http.post("https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json", data, {headers: headers})
    .subscribe((res) => {
      console.log(res)
    })
  }
}