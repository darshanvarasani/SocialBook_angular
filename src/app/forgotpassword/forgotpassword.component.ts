import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private service: DataserviceService, private router: Router, private toastr : ToastrService) { }
  users = []
  forgotpass: FormGroup
  flag = false

  ngOnInit(): void {
    this.service.getusers().subscribe(res => {
      this.users = res;
    })
    this.forgotpass = new FormGroup({
      femail: new FormControl('', Validators.required)
    });
  }

  checkemail() {
    for (let u of this.users) {
      if (u.email == this.forgotpass.get('femail').value) {
        this.flag = true;
      }
    }
    if (this.flag) {
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      sessionStorage.setItem("otp",OTP)
      sessionStorage.setItem("email",this.forgotpass.get('femail').value)
      this.service.sendmail(this.forgotpass.get('femail').value, OTP).subscribe(res => { })
      this.toastr.info("OTP sent to your email id")
      this.router.navigateByUrl('/resetpassword');
    }
    else {
      this.toastr.error("Email id not registered!!");
    }
  }

}
