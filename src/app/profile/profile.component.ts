import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { UserDetails } from "../signup/userdetails";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: DataserviceService, private router: Router, private toastr : ToastrService) { }
  fname: string
  mname: string
  lname: string
  email: string = sessionStorage.getItem('username')
  password: string
  gender: string
  dob: string
  hobbies: string
  city: string
  state: string
  profilepic: File = null
  data: UserDetails
  posts = []
  user = []
  friends = []
  ngOnInit(): void {
    if(sessionStorage.getItem('username') == null) {
      this.router.navigateByUrl('/login')
    }
    this.service.getUserWithId(this.email).subscribe(res => {
      this.user = res;
      for(let u of res)
      {
        this.fname = u.fname;
        if(u.mname!=null){this.mname = u.mname;}
        this.lname = u.lname;
        this.dob = u.dob;
        if(u.hobbies!=null){this.hobbies = u.hobbies;}
        if(u.city!=null){this.city = u.city;}
        if(u.state!=null){this.state = u.state;}
      }
      for(let u of this.user[0].friends) {
        this.service.getUserWithId(u).subscribe( res => {
          this.friends.push(res[0]);
        })
      }
    });
    this.service.getpostWithId(this.email).subscribe( res => {
      this.posts = res;
    })
  }

  updateDetails(fdata : any) {
    let flag = true;
    if(fdata.fname=="")
    {
      fdata.fname=this.fname;
    }
    if(fdata.mname=="")
    {
      fdata.mname=this.mname;
    }
    if(fdata.lname=="")
    {
      fdata.lname=this.lname;
    }
    if(fdata.dob=="")
    {
      fdata.dob=this.dob;
    }
    if(fdata.hobbies=="")
    {
      fdata.hobbies=this.hobbies;
    }
    if(fdata.city=="")
    {
      fdata.city=this.city;
    }
    if(fdata.state=="")
    {
      fdata.state=this.state;
    }
      this.data = {
        "fname": fdata.fname,
        "lname": fdata.lname,
        "email": this.email,
        "password": this.user[0].password,
        "gender": this.user[0].gender,
        "dob": fdata.dob,
        "city": fdata.city,
        "hobbies": fdata.hobbies,
        "state": fdata.state,
        "mname": fdata.mname,
        "imageUrl": this.user[0].imageUrl,
        "friends": this.user[0].friends,
        "friendreq": this.user[0].friendreq
      }
      this.service.updateDetails(this.data).subscribe( res => {})
      this.toastr.success("Details Updated Successfully!!");
      window.location.reload();
  }

}
