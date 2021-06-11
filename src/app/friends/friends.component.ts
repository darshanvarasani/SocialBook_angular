import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { UserDetails } from "../signup/userdetails";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private service: DataserviceService, private toastr: ToastrService, private router : Router) { }
  data: UserDetails
  users = []
  requests = []
  friendlist = []
  currentuser: UserDetails
  index: number
  email = sessionStorage.getItem('username')
  ngOnInit(): void {
    if(sessionStorage.getItem('username') == null) {
      this.router.navigateByUrl('/login')
    }
    this.service.getusers().subscribe(res => {
      this.users = res;
      this.index = this.users.length
      let i: number = 0
      for (let u of this.users) {
        if (u.email == this.email) {
          this.currentuser = u;
          this.users.splice(i, 1);
          this.index--
          break;
        }
        i++;
      }
      for (let u of this.users) {
          if (u.friendreq.includes(this.currentuser.email)) {
            i = this.users.findIndex(e => e.email == u.email)
            this.users.splice(i, 1);
            this.index--
          }
      }
        for (let f of this.currentuser.friends) {
          i = 0
          this.service.getUserWithId(f).subscribe(resp => {
            this.friendlist.push(resp[0]);
          })
          for (let u of this.users) {
            if (u.email == f) {
              this.users.splice(i, 1);
              this.index--
              break;
            }
            i++;
          }
        }
        for (let f of this.currentuser.friendreq) {
          i = 0
          this.service.getUserWithId(f).subscribe(resp => {
            this.requests.push(resp[0]);
          })
          for (let u of this.users) {
            if (u.email == f) {
              this.users.splice(i, 1);
              this.index--
              break;
            }
            i++;
          }
        }
    });

  }

  sendReq(fdata: any) {
    let frienduser = []
    let friendreq = []
    this.service.getUserWithId(fdata.email).subscribe(res => {
      frienduser = res;
      friendreq = res[0].friendreq;
      friendreq.push(this.email); 
      this.data = {
        "fname": frienduser[0].fname,
        "lname": frienduser[0].lname,
        "email": fdata.email,
        "password": frienduser[0].password,
        "gender": frienduser[0].gender,
        "dob": frienduser[0].dob,
        "city": frienduser[0].city,
        "hobbies": frienduser[0].hobbies,
        "imageUrl": frienduser[0].imageUrl,
        "state": frienduser[0].state,
        "mname": frienduser[0].mname,
        "friends": frienduser[0].friends,
        "friendreq": friendreq
      }
      this.service.updateDetails(this.data).subscribe(res => { })
      this.toastr.success('Friend request sent successfully.');
      let i: number = 0
      for (let u of this.users) {
        if (u.email == fdata.email) {
          this.users.splice(i, 1);
          break;
        }
        i++;
      }
    })
  }

  acceptReq(fdata: any) {
    let frienduser = []
    let friends = []
    let user = []
    let friendreq = []
    this.service.getUserWithId(fdata.email).subscribe(res => {
      frienduser = res;
      friends = res[0].friends;
      friends.push(this.email);
      this.data = {
        "fname": frienduser[0].fname,
        "lname": frienduser[0].lname,
        "email": fdata.email,
        "password": frienduser[0].password,
        "gender": frienduser[0].gender,
        "dob": frienduser[0].dob,
        "imageUrl": frienduser[0].imageUrl,
        "city": frienduser[0].city,
        "hobbies": frienduser[0].hobbies,
        "state": frienduser[0].state,
        "mname": frienduser[0].mname,
        "friends": friends,
        "friendreq": frienduser[0].friendreq
      }
      this.service.updateDetails(this.data).subscribe(res => { })
      let i = this.users.findIndex(e => e.email == fdata.email);
      this.users.splice(i, 1);
    })
    this.service.getUserWithId(this.email).subscribe(res => {
      user = res;
      friends = res[0].friends;
      friends.push(fdata.email);
      friendreq = res[0].friendreq;
      let i = this.users.findIndex(e => e.email == fdata.email);
      friendreq.splice(i, 1);
      this.data = {
        "fname": user[0].fname,
        "lname": user[0].lname,
        "email": this.email,
        "password": user[0].password,
        "gender": user[0].gender,
        "dob": user[0].dob,
        "imageUrl": user[0].imageUrl,
        "city": user[0].city,
        "hobbies": user[0].hobbies,
        "state": user[0].state,
        "mname": user[0].mname,
        "friends": friends,
        "friendreq": friendreq
      }
      this.service.updateDetails(this.data).subscribe(res => { })
      i = this.requests.findIndex(e => e.email == fdata.email)
      this.requests.splice(i, 1)
    })
    this.service.getUserWithId(fdata.email).subscribe( res => {
      this.friendlist.push(res[0])
    })
  }

  declineReq(fdata: any) {
    let user = []
    let friendreq = []
    this.service.getUserWithId(this.email).subscribe(res => {
      user = res;
      friendreq = res[0].friendreq;
      let i = this.users.findIndex(e => e.email == fdata.email);
      friendreq.splice(i, 1);
      this.data = {
        "fname": user[0].fname,
        "lname": user[0].lname,
        "email": this.email,
        "password": user[0].password,
        "gender": user[0].gender,
        "dob": user[0].dob,
        "imageUrl": user[0].imageUrl,
        "city": user[0].city,
        "hobbies": user[0].hobbies,
        "state": user[0].state,
        "mname": user[0].mname,
        "friends": user[0].friends,
        "friendreq": friendreq
      }
      this.service.updateDetails(this.data).subscribe(res => { })
      this.service.getUserWithId(fdata.email).subscribe(res => {
        this.users.push(res[0]);
      })
      i = this.requests.findIndex(e => e.email == fdata.email)
      this.requests.splice(i, 1)
    })
  }
}
