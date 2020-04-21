import Vue from 'vue'
import Router from 'vue-router'
import Deck from '../pages/Deck'
import PlayingDeck from '../pages/PlayingDeck'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      redirect: '/deck/new'
    },
    {
      path: '/deck/new',
      name: 'Deck',
      component: Deck
    },
    {
      path: '/deck/:id',
      name: 'PlayingDeck',
      component: PlayingDeck
    }
  ]
})
