import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';


const routes: Routes = [
  { path: 'todo-list', component: TodoComponent },
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/todo-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
