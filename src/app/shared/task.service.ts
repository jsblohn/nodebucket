/*
============================================
; Title:  task.service.ts
; Author: Professor Krasso
; Date:   06 October 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; Task service; finds, defines, updates and deletes tasks for nodebucket
============================================
*/
/* Import required modules from Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**********************
   * findAllTasks
  ***********************/
 findAllTasks(empId: string): Observable<any> {
   return this.http.get('api/employees/' + empId + '/tasks')
 }

  /**********************
   * createTask
  ***********************/
 createTask(empId: string, task: string): Observable<any> {
   return this.http.post('/api/employees/' + empId + '/tasks', {
     text: task
   })
 }

  /**********************
   * updateTask
  ***********************/
 updateTask(empId: string, toDos: Item[], done: Item[]): Observable<any> {
   return this.http.put('/api/employees/' + empId + '/tasks', {
     toDos,
     done
   })
 }

  /**********************
   * deleteTask
  ***********************/
 deleteTask(empId: string, taskId: string): Observable<any> {
   return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
 }
}
