import { Component, Input, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;

  allTasks: Task[] = [];

  http: HttpClient = inject(HttpClient);
  task: TaskService = inject(TaskService);

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  ngOnInit(): void {
    this.FetchAllTasks();
  }

  FetchAllTasksClicked() {
    this.FetchAllTasks();
  }

  DeleteTask(id: string | undefined) {
    this.task.DeleteTask(id).subscribe((res) => {
      console.log(res);
      this.FetchAllTasks();
    });
  }

  DeleteAllTasks() {
    this.task.DeleteAllTasks().subscribe(() => {
      this.FetchAllTasks();
    });
  }
  CreateTask(data: Task) {
    this.task.CreateTask(data).subscribe((res) => {
      console.log(res);
      this.FetchAllTasks();
    });
  }

  private FetchAllTasks() {
    this.task.GetAllTasks().subscribe((tasks) => {
      console.log(tasks);
      this.allTasks = tasks;
    });
  }
}
