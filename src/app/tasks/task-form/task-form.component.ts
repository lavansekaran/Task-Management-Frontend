import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/core/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  // Flag to determine if form is in edit or create mode
  isEditMode: boolean = false;
  // Store the current task data when in edit mode
  taskData: any;
  // Predefined options for task status and priority dropdowns
  statusOptions = ['To Do', 'In Progress', 'On Hold', 'Completed'];
  priorityOptions = ['Low', 'Medium', 'High', 'Critical'];

  taskForm: FormGroup;
  taskUpdateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the create task form with default values
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [this.formatDate(new Date()), Validators.required],
      endDate: [''],
      status: ['To Do', Validators.required],
      priority: ['Low', Validators.required]
    });

    // Initialize the update task form
    this.taskUpdateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      // If URL contains an ID parameter, load the task for editing
      if (params.id) {
        this.getTaskById(params.id);
      }
    });
  }

  // Fetch task details by ID and populate the update form
  getTaskById(taskId: string) {
    this.isEditMode = true;
    this.taskService.getTaskById(taskId).subscribe((res: any) => {
      let task = res.data;
      // Format dates before populating the form
      this.taskData = {
        ...task,
        startDate: this.formatDate(new Date(task.startDate)),
        endDate: this.formatDate(new Date(task.endDate)),
      }
      this.taskUpdateForm.patchValue(this.taskData);
    });
  }

  // Handle form submission for creating new tasks
  onSubmit() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      const userDataString = localStorage.getItem('userData');
      
      // Redirect to login if user data is not found
      if (!userDataString) {
        this.router.navigate(['/login']);
        return;
      }

      const userData = JSON.parse(userDataString);
      
      // Combine form data with user ID and creation timestamp
      const taskWithUser = {
        ...task,
        user: userData.userId,
        createdAt: new Date()
      };

      // Create task and navigate to task list on success
      this.taskService.createTask(taskWithUser).subscribe((res) => {
        this.router.navigate(['/task-list']);
      });
    }
  }

  // Handle form submission for updating existing tasks
  updateTask() {
    if (this.taskUpdateForm.valid) {
      const updatedTask = this.taskUpdateForm.value;
      // Update task and navigate to task list on success
      this.taskService.updateTask(this.taskData._id, updatedTask).subscribe((res) => {
        this.router.navigate(['/task-list']);
      });
    }
  }

  // Utility function to format dates in YYYY-MM-DD format
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Navigation helper to return to task list
  onBack() {
    this.router.navigate(['/task-list']);
  }
}