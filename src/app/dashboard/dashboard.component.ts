import { Component, Input, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
  showCreateTaskForm: boolean = false;

  allTasks : Task[] = []

  http: HttpClient = inject(HttpClient)

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  ngOnInit(): void {
    this.FetchAllTasks()
  }

  FetchAllTasksClicked() {
    this.FetchAllTasks()
  }

  CreateTask(data: Task){
    const headers = new HttpHeaders({"my-header": "my-header"})
    this.http.post("https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json", data, {headers: headers})
    .subscribe((res) => {
      console.log(res)
      // this.FetchAllTasks()
    })
  }

  private FetchAllTasks(){
    this.http.get<{[key: string]: Task}>("https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json")
    .pipe(map((response) => {
      console.log(response, 'response')
      let tasks = []
      for(let key in response) {
        if(response.hasOwnProperty(key))
        tasks.push({id: key, ...response[key]})
      }
      return tasks
    }))
    .subscribe((tasks) => {
      console.log(tasks)
      this.allTasks = tasks
    })
  }
}