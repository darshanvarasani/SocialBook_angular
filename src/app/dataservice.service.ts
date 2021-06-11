import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from "../app/signup/userdetails";
import { UserPost } from "../app/signup/posts";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  
  constructor(private http: HttpClient) { }
  getusers(): Observable<any> {
    return this.http.get('http://localhost:3000/users')
  }

  // regiterUser(data:UserDetails): Observable<any> {
  //   return this.http.post('http://localhost:3000/register',JSON.stringify(data),httpOptions);
  // }

  registerUser(data:UserDetails, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fname', data.fname);
    formData.append('lname', data.lname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('gender', data.gender);
    formData.append('dob', data.dob);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', 'http://localhost:3000/register', formData, options);
    return this.http.request(req);
  }

  getUserWithId(userid: string): Observable<any> {
    return this.http.get('http://localhost:3000/users/' + userid, { observe: 'body'})
  }

  updateDetails(data:UserDetails): Observable<any> {
    return this.http.put('http://localhost:3000/updateDetails',JSON.stringify(data),httpOptions);
  }

  blockUser(data:UserDetails): Observable<any> {
    return this.http.put('http://localhost:3000/blockuser', JSON.stringify(data),httpOptions);
  }

  getprofileWithId(userid: string): Observable<any> {
    return this.http.get('http://localhost:3000/usersprofile/' + userid, { observe: 'body'})
  }

  addProfile(userid: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userid', userid);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', 'http://localhost:3000/usersprofile', formData, options);
    return this.http.request(req);
  }

  addPost(userpost: UserPost, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userid', userpost.userid);
    formData.append('description', userpost.description);
    formData.append('fname', userpost.fname);
    formData.append('lname', userpost.lname);
    formData.append('profileUrl', userpost.profileUrl);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', 'http://localhost:3000/userpost', formData, options);
    return this.http.request(req);
  }

  getposts(): Observable<any> {
    return this.http.get('http://localhost:3000/posts/')
  }

  getpostWithId(userid: string): Observable<any> {
    return this.http.get('http://localhost:3000/userposts/' + userid, { observe: 'body'})
  }

  sendmail(userid: string, otp: string): Observable<any> {
    return this.http.get('http://localhost:3000/sendmail/' + userid + "/" + otp, { observe: 'body'})
  }
}
