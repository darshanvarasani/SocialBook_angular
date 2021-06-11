import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DataserviceService } from '../dataservice.service';
import { UserPost } from '../signup/posts';
import { UserDetails } from '../signup/userdetails';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userpost: FormGroup
  photo: File
  postdata: UserPost
  userdata: UserDetails
  friends = []
  uploads = []

  constructor(private service: DataserviceService, private toastr: ToastrService, private router : Router) { }
  //Jquery code for post
  ngOnInit(): void {
    if(sessionStorage.getItem('username') == null) {
      this.router.navigateByUrl('/login')
    }
    $(document).ready(function () {
      $("#postsomething").click(function () {
        $("#postpanel").slideToggle("slow");
      });
      var i = 0;
      while (i < 100) {
        $("#logo").fadeToggle(2000);
        i++;
      }
    });
    this.userpost = new FormGroup({
      description: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
    this.service.getpostWithId(sessionStorage.getItem('username')).subscribe( res => {
      this.uploads = res;
    })
    this.service.getUserWithId(sessionStorage.getItem('username')).subscribe( res => {
      this.userdata = res[0]
      this.friends.push(this.userdata)
      for(let f of this.userdata.friends) {
        this.service.getpostWithId(f).subscribe( res => {
          for(let r of res) {
            this.uploads.push(r);
          }
          this.uploads.sort( (a, b) => (a.uploaded > b.uploaded ? -1 : 1));
        })
        this.service.getUserWithId(f).subscribe( res => {
          this.friends.push(res[0])
        })
      }
    })
  }

  handleFileInput(files: FileList) {
    this.photo = files.item(0);
  }

  postphoto() {
    this.postdata = {
      userid: sessionStorage.getItem('username'),
      imageUrl: this.userpost.get('file').value,
      description: this.userpost.get('description').value,
      fname: this.userdata.fname,
      lname: this.userdata.lname,
      profileUrl: this.userdata.imageUrl,
      uploaded: null
    }
    this.service.addPost(this.postdata, this.photo).subscribe(res => { })
    this.toastr.info("post uploaded!!");
  }

}
