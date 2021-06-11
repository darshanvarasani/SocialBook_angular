import { Content } from '@angular/compiler/src/render3/r3_ast'

export interface UserDetails {    
    fname : string,
    lname : string,
    mname : string,
    email : string,
    password : string,
    gender : string,
    dob : string,
    hobbies : string,
    city : string,
    state : string,
    imageUrl: string,
    friends : string[],
    friendreq : string[]
}