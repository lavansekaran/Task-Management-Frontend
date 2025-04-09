import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.baseUrl);
  }

  createTask(task: any) {
    return this.http.post(this.baseUrl, task);
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTaskById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
