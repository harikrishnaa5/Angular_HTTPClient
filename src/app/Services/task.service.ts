import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../Model/Task';
import { catchError, map, Subject, throwError } from 'rxjs';
import { LoggingService } from './Logging.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  logService: LoggingService = inject(LoggingService);
  errorSubject = new Subject<HttpErrorResponse>();
  GetAllTasks() {
    const response = this.http
      .get<{ [key: string]: Task }>(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        map((response) => {
          let tasks = [];
          for (let key in response) {
            if (response.hasOwnProperty(key))
              tasks.push({ id: key, ...response[key] });
          }
          return tasks;
        }),
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      );
    return response;
  }

  CreateTask(data: Task) {
    this.http
      .post(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json',
        data
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  UpdateTask(id: string | undefined, data: Task) {
    this.http
      .put(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json',
        data
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteAllTasks() {
    this.http
      .delete(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteTask(id: string | undefined) {
    this.http
      .delete(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json'
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  FetchTaskDetails(id: string | undefined) {
    return this.http.get<Task>('https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks/' + id + '.json')
    .pipe(map(data => {
      let task = {id: id, ...data}
      return task
    }))
  }
}
