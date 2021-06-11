import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessageboxComponent } from './messagebox/messagebox.component';
import { FriendsComponent } from './friends/friends.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfilecardComponent } from './profilecard/profilecard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageboxComponent,
    FriendsComponent,
    LoginComponent,
    ProfileComponent,
    ResetpasswordComponent,
    SignupComponent,
    UserlistComponent,
    ForgotpasswordComponent,
    AdminhomeComponent,
    AdminloginComponent,
    NavigationComponent,
    ProfilecardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
