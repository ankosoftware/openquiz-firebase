import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseModule } from './firebase/firebase.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FirebaseModule
  ]
})
export class GeneralModule {}
