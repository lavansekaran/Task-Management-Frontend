import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: any = null;
  inprogressTask: any[] = []
  completedTask: any[] = []


  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  // Initialize component by loading tasks
  ngOnInit() {
    this.loadTasks();
  }

  // Fetch all tasks and categorize them by status
  loadTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      // Store all tasks
      this.tasks = res.data;
      // Filter tasks that are in progress
      this.inprogressTask = this.tasks.filter((i: any) => i.status === 'In Progress');
      // Filter tasks that are completed
      this.completedTask = this.tasks.filter((i: any) => i.status === 'Completed');
    });
  }

  // Navigate to task edit page with the selected task's ID
  editTask(data: any) {
    this.router.navigate([`/task/${data._id}`]);
  }

  // Delete a task after confirmation
  delete(id: string) {
    // Show confirmation dialog before deletion
    if (!confirm('Are you sure you want to delete this task?')) return;
    // Delete task and reload the task list
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  // Navigate to task creation page
  addNewTask() {
    this.router.navigate(['/task']);
  }
}