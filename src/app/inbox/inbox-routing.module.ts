import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: {
          email: EmailResolverService,
        },
      },
      {
        path: '',
        component: PlaceholderComponent,
      },
    ],
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
