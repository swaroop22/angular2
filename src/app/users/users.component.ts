import { Component, OnInit } from '@angular/core';
import {UsersService} from './shared/users.service';
import {User} from './shared/user';
import {Address} from './shared/address';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users: User[] = [];
  private address: Address[] = [];
  private personDetails: User;

 private showAddressFlag: boolean = false;
 private showPersonDisplay: boolean = false;
 private addressList: Address[] = [];
  constructor(private usersService: UsersService, ) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((data) => {
        this.users = data.map((e) => {
          //console.log("e: "+ JSON.stringify(e));
          if (!e.address && e.addressList && e.addressList.length > 0 ) {
            e.address = e.addressList[0].address1 + ', ' + e.addressList[0].address2 + ', ' + e.addressList[0].city + ', '
              + e.addressList[0].state;
            //console.log("Adress: "+e.address);
            //console.log("=======================")
            //console.log("AddressList: "+JSON.stringify(e.addressList));
            this.addressList.push(e.addressList);
            //console.log("=======================")
           // console.log("=======================")
            //console.log("this Address List: "+JSON.stringify(this.addressList));
          }
          return e;
        });
      });
   // console.log("Addres List: "+this.addressList);
  }

  displayPersonData(i){
    this.showPersonDisplay = true;
    this.personDetails = this.users[i];
    //console.log("i ==> "+i)
    //console.log("personDetails: "+ JSON.stringify(this.personDetails))
    //console.log("JAAAAAAAAAAAAAAJAJAJAJA: "+this.personDetails)

  }

  displayAddress(i){
    this.showAddressFlag = true;

    /*for(var j = 0;j<this.addressList[i].length;j++) {
      console.log(this.addressList[i][j]);
    } */
 //console.log("i ==> "+i);
  //console.log("Address List for individuals: "+ this.addressList[i]);
  //here addressList is having an Array of Address
  this.address.push(this.addressList[i]);
  //console.log("In Address ===============> "+ JSON.stringify(this.address));

 // console.log("user:"+ JSON.stringify(user));
  //console.log("user: "+ user.toString());
  //  let href = (JSON.stringify(user)).addressList[0].links[0].href ;

  }
  deleteUser(user, index) {
    console.log(user);
    if (confirm('Are you sure you want to delete ' + this.users[index]['firstName'] + '?')) {
      this.usersService.deleteUser(user.id)
        .subscribe(data => {
           // this.users.splice(index, 1);
            //console.log(data);
          },
          err => {
          //  console.log(err);
           // alert('Could not delete user.');
          });
    }
  }

}
