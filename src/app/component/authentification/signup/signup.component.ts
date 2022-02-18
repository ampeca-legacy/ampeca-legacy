import {Component, OnInit, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios'
import 'form-data'
@Component({selector: 'app-signup', templateUrl: './signup.component.html', styleUrls: ['./signup.component.css']})


export class SignupComponent implements OnInit {
    constructor(private router : Router) {}
    url = 'http://localhost:3000/api/register';;
     placeholder : string = "" ;
     persondata : any = {}
    error = "" ;
    img : any = {}
  
    ngOnInit(): void {}

    onKey(event : any, id : string) {
        this.placeholder = event.target.value
        console.log(this.placeholder, event.target.name);
        this.persondata[id] = this.placeholder
        console.log(this.persondata[id]);
    }
    onchange(event : any) {
        this.img = event.target.files[0];
        console.log(this.img);
    }
    on(event : any) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", this.img);
        formData.append("upload_preset", "nt1uphup");
        axios.post("http://api.cloudinary.com/v1_1/magico/image/upload", formData).then((result) => {
            console.log(result.data.url);
            this.persondata['src'] = result.data.url;
        }).then(() => {
            axios.post(this.url, this.persondata).then((res) => {
                console.log(res)
                if (res.data === "The user has been registerd with us!") {
                    this.router.navigate(["login"])
                } else {
                    this.router.navigate(["signup"])
                    this.error = res.data
                }
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
        console.log(this.persondata, "aahhhhh")


    }
}
