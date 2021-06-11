import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DataserviceService } from '../dataservice.service';
import { UserDetails } from '../signup/userdetails';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private srevie : DataserviceService,private router : Router, private toastr : ToastrService ) { }
  resetpass : FormGroup
  user : UserDetails
  pass : string
  cpass : string
  otp : string

  ngOnInit(): void {
    this.resetpass = new FormGroup({
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required)
    });
  }

  resetpassword() {
    this.pass = this.resetpass.get('password').value
    this.cpass = this.resetpass.get('cpassword').value
    this.otp = this.resetpass.get('otp').value
    if(this.pass == "" || this.cpass == "") {
      this.toastr.error("Please Enter password!!")
    }
    else {
      if(this.pass != this.cpass) {
        this.toastr.error("Enter same password in both fields")
      }
      else if(this.otp != sessionStorage.getItem('otp')) {
        this.toastr.error("incorrect otp entered")
      }
      else {
        this.srevie.getUserWithId(sessionStorage.getItem('email')).subscribe( res => {
          this.user = res[0]
          this.user.password = this.pass
          this.srevie.updateDetails(this.user).subscribe( res => {})
          this.toastr.success("password reset successfully!!")
          sessionStorage.clear()
          this.router.navigateByUrl('/login')
        })
      }
    }
  }

}
