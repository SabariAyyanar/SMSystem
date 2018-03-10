import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {OauthGuard} from './guard/oauth.guard';

        const routes: Routes = [
          {
            path: 'application',
            loadChildren: 'app/modules/application/application.module#ApplicationModule'
          },
          {
          path: 'assets',
          loadChildren: 'app/modules/schoolassets/assets.module#AssetsModule'
          },
          {
          path: 'entities',
          loadChildren: 'app/modules/entities/entities.module#EntitiesModule'
          },
          {
          path: 'monetary',
          loadChildren: 'app/modules/monetary/monetary.module#MonetaryModule'
          },
          {
            path: 'settings',
            loadChildren: 'app/modules/settings/settings.module#SettingsModule'
          },
          {
          path: 'summary',
          loadChildren: 'app/modules/summary/summary.module#SummaryModule'
          },
          {
            path:'', 
            redirectTo:'/application',pathMatch:'full'},
          {
          path: '**',
          redirectTo:'/application/pagenotfound',pathMatch:'full'
          },
        ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports:[RouterModule]
})
export class AppRoutingModule { }
