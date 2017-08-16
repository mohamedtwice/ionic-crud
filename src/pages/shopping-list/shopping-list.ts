import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';


/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  private database: AngularFireDatabase,
  private actionSheetCtrl: ActionSheetController) {

    // pointing shopping list reference at firebase and shopping list node
    this.shoppingListRef$ = this.database.list('shopping-list');

}

selectShoppingItem(shoppingItem: ShoppingItem) {


this.actionSheetCtrl.create({
title: `${shoppingItem.itemName}`,
buttons: [
{
text: 'Edit',
handler: () => {
this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.$key})

}
},
{
text: 'Delete',
role: 'destructive',
handler: () => {
this.shoppingListRef$.remove(shoppingItem.$key);
}
},
{
text: 'Cancel',
role: 'cancel',
handler: () => {
console.log('the user has selected the cancel button')
}
}
]


}).present();
  }


navigatetoAddShoppingPage() {
//navigate to AddShoppingPage
this.navCtrl.push(AddShoppingPage)
}

}
