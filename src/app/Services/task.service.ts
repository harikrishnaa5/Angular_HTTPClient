import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../Model/Task';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  GetAllTasks() {
    const response = this.http
      .get<{ [key: string]: Task }>(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        map((response) => {
          console.log(response, 'response');
          let tasks = [];
          for (let key in response) {
            if (response.hasOwnProperty(key))
              tasks.push({ id: key, ...response[key] });
          }
          return tasks;
        })
      );
    return response;
  }

  CreateTask(data: Task) {
    const response = this.http.post(
      'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json',
      data
    );
    return response;
  }

  DeleteAllTasks() {
    const response = this.http.delete(
      'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json'
    );
    return response;
  }

  DeleteTask(id: string | undefined) {
    const response = this.http.delete(
      'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks/' +
        id +
        '.json'
    );
    return response;
  }
}
