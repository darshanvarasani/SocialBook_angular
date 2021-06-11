import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : DataserviceService, private router : Router, private toastr : ToastrService) { }
  login : FormGroup
  username : string
  password : string
  users = []
  flag : Boolean = true
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
  this.login = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  this.service.getusers().subscribe(res => {
    this.users = res;
  });
  }

  loginuser(){
    sessionStorage.clear()
    this.username = this.login.get('username').value
    this.password = this.login.get('password').value
    for(let user of this.users)
    {
      if(user.email==this.username && user.password==this.password)
      {
        sessionStorage.setItem('username', user.email);
        this.flag = false;
        this.toastr.success("Logged in successully!!");
        this.router.navigateByUrl('/home');
        break;
      }
    }
    if(this.flag)
    {
      this.toastr.error("incorrect username or password!!");
      this.router.navigateByUrl('/login');
    }
  }

}
