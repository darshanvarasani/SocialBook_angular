import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private service : DataserviceService, private router : Router, private toastr : ToastrService) { }
  adminlogin : FormGroup
  username : string
  password : string
  loginadmin(){
    this.username = this.adminlogin.get('username').value
    this.password = this.adminlogin.get('password').value
      if(this.username=="admin@gmail.com" && this.password=="admin123")
      {
        sessionStorage.setItem('username',this.username);
        this.toastr.success("Logged in successfully!!");
        this.router.navigateByUrl('/adminhome');
      }
    else
    {
      this.toastr.error("incorrect username or password!!");
      this.router.navigateByUrl('/adminlogin');
    }
  }
  ngOnInit(): void {
    (function () {
      'use strict';
      window.addEventListener('load', function () {
          // Get the forms we want to add validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function (form:any) {
              form.addEventListener('submit', function (event:any) {
                  if (form.checkValidity() === false) {
                      event.preventDefault();
                      event.stopPropagation();
                  }
                  form.classList.add('was-validated');
              }, false);
          });
      }, false);
  })();
  this.adminlogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  }
}
