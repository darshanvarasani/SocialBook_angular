import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { UserDetails } from '../signup/userdetails';
import { Router } from "@angular/router";

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {

  constructor(private service: DataserviceService, private router : Router) { }
  email = sessionStorage.getItem('username')
  user = []
  friends = []
  ngOnInit(): void {
    if(sessionStorage.getItem('username') == null) {
      this.router.navigateByUrl('/login')
    }
    this.service.getUserWithId(this.email).subscribe(res => {
      this.user = res;
      for (let u of this.user[0].friends) {
        this.service.getUserWithId(u).subscribe(res => {
          this.friends.push(res[0]);
        })
      }
    });
  }

  open_tab(user : UserDetails) {
    document.getElementById("chatlist").style.setProperty("display", "none");
    document.getElementById("chatbox").style.removeProperty("display");
    document.getElementById("chatname").innerHTML = user.fname + " " + user.lname;
    var pic:any = document.getElementById("chatpic")
    pic.src = user.imageUrl;
  }

  close_tab() {
    document.getElementById("chatbox").style.setProperty("display", "none");
    document.getElementById("chatlist").style.removeProperty("display");
  }

}
