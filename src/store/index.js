import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'

Vue.use(Vuex, axios)

export const store = new Vuex.Store({
  state: {
    deckId: '',
    pileCards: '',
    pileCardsResult: {},
    rotationCard: {}
  },
  actions: {
    newDeck ({ commit, dispatch }) {
      axios
        .get('https://deckofcardsapi.com/api/deck/new/')
        .then(function (response) {
          commit('setDeckId', response.data.deck_id)
          dispatch('drawCards')
        })
        .catch(function (error) {
          this.output = error
        })
    },
    drawCards ({ state, dispatch }) {
      axios
        .get('https://deckofcardsapi.com/api/deck/' + state.deckId + '/draw/?count=52')
        .then(function (response) {
          dispatch('createPile')
        })
        .catch(function (error) {
          this.output = error
        })
    },
    createPile ({ state, dispatch }) {
      axios.get('https://deckofcardsapi.com/api/deck/' + state.deckId + '/pile/player/add/?cards=' + state.pileCards)
        .then(function (response) {
          dispatch('getPile')
        })
        .catch(function (error) {
          this.output = error
        })
    },
    getPile ({ commit, state }) {
      axios
        .get('https://deckofcardsapi.com/api/deck/' + state.deckId + '/pile/player/list/')
        .then(function (response) {
          commit('setPileCardsResult', response.data.piles.player.cards)
          router.push({ path: `/deck/${state.deckId}` })
        })
        .catch(function (error) {
          this.output = error
        })
    }
  },
  mutations: {
    setDeckId (state, deckId) {
      state.deckId = deckId
    },
    setDeckCards (state, deckCards) {
      state.deckCards = deckCards
    },
    setRotationCard (state, rotationCard) {
      state.rotationCard = rotationCard
    },
    setPileCards (state, pileCards) {
      state.pileCards = pileCards
    },
    setPileCardsResult (state, pileCardsResult) {
      state.pileCardsResult = pileCardsResult
    }
  },
  getters: {
    getDeckId: state => state.deckId,
    getDeckCards: state => state.deckCards,
    getRotationCard: state => state.rotationCard,
    getPileCards: state => state.pileCards,
    getPileCardsResult: state => state.pileCardsResult
  }
})
