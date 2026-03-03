import { Routes } from '@angular/router';
import { AppComponent } from './components/appComponent/app.component';
import { TemplateFormUpdaterComponent } from './components/templateFormUpdater/templateFormUpdaterComponent';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'todos', component: AppComponent },
  { path: 'todos/new', component: TemplateFormUpdaterComponent },
  { path: 'todos/:id/update', component: TemplateFormUpdaterComponent },
  { path: '**', redirectTo: 'todos' },
];
