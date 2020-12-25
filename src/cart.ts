import { writable, get, derived } from 'svelte/store'
import _ from 'lodash'
import Dinero from "dinero.js";
function createCart() {
  let cartStore = writable({
    items: [],
    totalPrice: Dinero({ amount: 0, currency: "USD" }),
    totalItems: 0
  })
  let computedStore = derived(cartStore, updatedCartStore => {
    console.log("Update on cartstore:", updatedCartStore)
    updatedCartStore.items = updatedCartStore.items.filter(item => item.quantity > 0)
    updatedCartStore.items.forEach(item => {
      item.totalPrice = item.product.price.multiply(item.quantity)
    })
    updatedCartStore.totalPrice = updatedCartStore.items.reduce((a, b) => a.add(b.totalPrice), Dinero({ amount: 0, currency: "USD" }))
    updatedCartStore.totalItems = updatedCartStore.items.reduce((a, b) => a + b.quantity, 0)

    // 2do update totalPrice
    // ..
    return updatedCartStore
  })
  return {
    subscribe: computedStore.subscribe,
    add: function (product) {
      if (this.findItem(get(cartStore), product)) {
        cartStore.update(currentCart => {
          let currentItem = this.findItem(currentCart, product)
          currentItem.quantity++;
          return currentCart;
        })
      }
      else {
        cartStore.update(cartStore => {
          cartStore.items.push({
            product: product,
            totalPrice: product.price,
            quantity: 1
          })
          return cartStore
        })
      }
    },
    findItem: function (currentCart, product) {
      return currentCart.items.find(item => _.isEqual(item.product, product))
    },
    set: cartStore.set,
    checkout: function () {
      return get(computedStore)
    }
  }
}
export let cart = createCart();