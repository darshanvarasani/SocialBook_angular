import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { UserDetails } from '../signup/userdetails';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private service : DataserviceService, private toastr : ToastrService, private router : Router) { }
  users = []
  blockuser:UserDetails
  data:UserDetails
  ngOnInit(): void {
    if(sessionStorage.getItem('username') == null) {
      this.router.navigateByUrl('/login')
    }
    this.service.getusers().subscribe( res => {
      this.users = res;
    })
  }

  blockUser(fdata : any) {
    this.blockuser = fdata
  }

  confirmBlock() {
    this.service.blockUser(this.blockuser).subscribe( res => {});
    this.service.getusers().subscribe( res => {
      this.users = res;
    })
    this.toastr.info("User Blocked!!");
    for(let u of this.users) {
      let friends = u.friends
      let friendreq = u.friendreq
      if(u.friends.includes(this.blockuser.email)) {        
        let i = u.friends.findIndex( e => e == this.blockuser.email);
        friends.splice(i, 1);
      }
      if(u.friendreq.includes(this.blockuser.email)) {        
        let i = u.friendreq.findIndex( e => e == this.blockuser.email);
        friendreq.splice(i, 1);
      }
      this.data = {
        "fname": u.fname,
        "lname": u.lname,
        "email": u.email,
        "password": u.password,
        "gender": u.gender,
        "dob": u.dob,
        "imageUrl": u.imageUrl,
        "city": u.city,
        "hobbies": u.hobbies,
        "state": u.state,
        "mname": u.mname,
        "friends": friends,
        "friendreq": friendreq
      }
      this.service.updateDetails(this.data).subscribe(res => { })
    }
  }

}
