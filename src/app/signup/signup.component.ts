import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetails } from "./userdetails";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fname: string
  lname: string
  email: string
  password: string
  gender: string
  dob: string
  signup: FormGroup
  data: UserDetails
  profilepic: File
  users = [];
  flag: Boolean = false;
  constructor(private service: DataserviceService, private router: Router, private toastr : ToastrService) { }
  
  handleFileInput(files: FileList) {
    this.profilepic = files.item(0);
  }

  register() {
    this.email=this.signup.get('email').value;
    for (let user of this.users) {
      if (user.email == this.email) {
        this.flag = true;
      }
    }
    if (this.flag) {
      this.toastr.warning("Email ID already registered");
      this.router.navigateByUrl('/login');
    }
    else {
      this.data = {
        "fname": this.signup.get('fname').value,
        "lname": this.signup.get('lname').value,
        "email": this.signup.get('email').value,
        "password": this.signup.get('password').value,
        "gender": this.signup.get('gender').value,
        "dob": this.signup.get('dob').value,
        "imageUrl": null,
        "city": null,
        "hobbies": null,
        "state": null,
        "mname": null,
        "friends": [],
        "friendreq": []
      }
      this.service.registerUser(this.data, this.profilepic).subscribe(res => { });
      // this.service.addProfile(this.email, this.profilepic).subscribe( res => {});
      this.toastr.info("Signed up successfuly. Please Login!!");      
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.signup = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required)
    });
    this.service.getusers().subscribe(res => {
      this.users = res;
    });
  }

}
