import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BackgroundComponent } from './components/background/background.component';
import { WorkExperienceComponent } from './components/background/work-experience/work-experience.component';
import { ProjectsComponent } from './components/background/projects/projects.component';
import { SkillsComponent } from './components/background/skills/skills.component';
import { CertificationsComponent } from './components/background/certifications/certifications.component';
import { EducationComponent } from './components/background/education/education.component';
import { ReferencesComponent } from './components/background/references/references.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    BackgroundComponent,
    WorkExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    CertificationsComponent,
    EducationComponent,
    ReferencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
