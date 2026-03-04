import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/aboutComponent';
import { AppComponent } from './components/appComponent/app.component';
import { ReactiveFormUpdaterComponent } from './components/reactiveFormUpdater/reactiveFormUpdaterComponent';
import { TemplateFormUpdaterComponent } from './components/templateFormUpdater/templateFormUpdaterComponent';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'about', component: AboutComponent },
  { path: 'todos', component: AppComponent },
  { path: 'todos/new', component: TemplateFormUpdaterComponent },
  { path: 'todos/:id/update', component: TemplateFormUpdaterComponent },
  { path: 'todos/:id/updateReactive', component: ReactiveFormUpdaterComponent },
  { path: '**', redirectTo: 'todos' },
];
