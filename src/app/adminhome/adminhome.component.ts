import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from "@angular/router";
import { UserPost } from "../signup/posts";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private service : DataserviceService, private router : Router, private toastr : ToastrService) { }
  photo : File
  postdata : UserPost
  adminpost : FormGroup

  ngOnInit(): void {
    if(sessionStorage.getItem('username') == null) {
      this.router.navigateByUrl('/login')
    }
    this.adminpost = new FormGroup({
      description: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      displayname: new FormControl('', Validators.required)
    });
  }

  handleFileInput(files: FileList) {
    this.photo = files.item(0);
  }

  postad() {
    this.postdata = {
      userid: sessionStorage.getItem('username'),
      imageUrl: this.adminpost.get('file').value,
      description: this.adminpost.get('description').value,
      fname: this.adminpost.get('displayname').value,
      lname: "",
      profileUrl: "assets/images/admin.png",
      uploaded: null
    }
    this.service.addPost(this.postdata, this.photo).subscribe(res => { })
    this.toastr.info("post uploaded!!");
  }

}
