import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';


@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

// creating new object
  shoppingItem = {} as ShoppingItem

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

  this.shoppingItemRef$ = this.database.list('shopping-list');

}

addShoppingItem(shoppingItem: ShoppingItem) {
  console.log(shoppingItem)

  this.shoppingItemRef$.push({
    itemName: this.shoppingItem.itemName,
    itemNumber: Number(this.shoppingItem.itemNumber)
})

// reset ShoppingItem
this.shoppingItem = {} as ShoppingItem;

// navigate user back to shoppinglistpage
this.navCtrl.pop();
}

}
