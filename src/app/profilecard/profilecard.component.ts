import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { UserDetails } from "../signup/userdetails";

@Component({
  selector: 'app-profilecard',
  templateUrl: './profilecard.component.html',
  styleUrls: ['./profilecard.component.css']
})
export class ProfilecardComponent implements OnInit {

  constructor(private service : DataserviceService) { }
  user = []
  ngOnInit(): void {
    this.service.getUserWithId(sessionStorage.getItem('username')).subscribe( res => {
      this.user = res;
    })
  }

}
