import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { SubsectionComponent } from './subsection/subsection.component';
import { FooterComponent } from './footer/footer.component';
import { BuilderComponent } from './builder/builder.component';
import { SavedFilesComponent } from './saved-files/saved-files.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionComponent,
    SubsectionComponent,
    FooterComponent,
    BuilderComponent,
    SavedFilesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    [SweetAlert2Module.forRoot()],
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
