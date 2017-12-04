import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../shared/user';
import { UsersService } from '../shared/users.service';
import { BasicValidators } from '../../shared/basic-validators';
import {Subscription} from 'rxjs/Subscription';
import {Address} from '../shared/address';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  user: User = new User();
  private userSubscription: Subscription;
  userValue;
  addressList: Address[] = []


  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.form = formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      middleName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      occupation: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      age: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      dob: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      address: formBuilder.group({
        address1: ['', Validators.minLength(3)],
        address2: [],
        city: ['', Validators.maxLength(30)],
        zipCode: ['', Validators.pattern('^([0-9]){5}([-])([0-9]){4}$')]
      })
    });
  }

  ngOnInit() {
    this.userValue = this.form.value;

    this.userSubscription = this.route.params.subscribe( params => {
      if (params['id'] !== undefined) {
        this.usersService.getUser(params['id']).subscribe( res => {
          const users = res.json();
          this.user.id = users.id;
          this.user.firstName = users.firstName;
          this.user.lastName = users.lastName;
          this.user.middleName = users.middleName;
          this.user.age = users.age;
          this.user.dob = users.dob;
          this.addressList = users.address;
          //console.log("User in Form ===> "+ users);
         // console.log(""+users.address.zipcode);
          this.addressList.forEach( add => {
            this.user.address.zipCode = add.zipCode;
            this.user.address.address1 = add.address1;
            this.user.address.address2 = add.address2;
            this.user.address.city = add.city;
          })
          this.userValue.setValue({
            firstName: users.middleName,
            lastName: users.middleName,
            middleName: users.middleName,
            age: users.age,
            dob: users.dob,
            createdOn: users.createdOn,
            updatedOn: users.updatedOn,
            address: users.address
          });
          console.log("User 00000000000"+ this.user);
        });
      }
    })

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit User' : 'New User';

      if (!id)
        return;

      this.usersService.getUser(id)
        .subscribe(
          user => this.user = user,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }



  save() {
    var result,
      userValue = this.form.value;


    if ( this.userValue.id != 0){
      result = this.usersService.updateUser(this.user, this.user.id);
    } else {
      result = this.usersService.addUser(userValue);
    }
    result.subscribe(data => {
        var res = JSON.parse(data);

      this.router.navigate(['/users']);

    });

  }


}
