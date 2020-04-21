<template>
  <div>
  <Header title="Ordered Pile"></Header>
    <div class="container-fluid page">
      <div class="cardList">
        <card v-for="(item) in finalCardOrder"
              v-bind:card-number="item.value"
              v-bind:card-suit="item.suit">
        </card>
      </div>

      <div class="content">
        <h2>High Card: <span>{{ finalCardOrder[0] ? finalCardOrder[0].code : '' }}</span></h2>
        <h2>Full House Combo: <span>None</span></h2>
      </div>
    </div>
  </div>
</template>

<script>
import {_} from 'vue-underscore'
import Card from '../components/Card'
import Header from '../components/layout/Header'

export default {
  components: { Card, Header },
  data () {
    return {
      rotationCard: this.$store.getters.getRotationCard,
      pileCardsResult: this.$store.getters.getPileCardsResult,
      cardRank: [
        '2',
        'ACE',
        'KING',
        'QUEEN',
        'JACK',
        '10',
        '9',
        '8',
        '7',
        '6',
        '5',
        '4',
        '3'
      ],
      suitRank: [
        'HEARTS',
        'DIAMONDS',
        'CLUBS',
        'SPADES'
      ],
      rotationSuitOrderLess: [],
      rotationSuitOrderGreater: [],
      rotationSuit: [],
      rotationCardOrderLess: [],
      rotationCardOrderGreater: [],
      rotationCardFinal: [],
      finalCardOrder: []
    }
  },
  mounted () {
    this.sortCards()
  },
  methods: {
    sortCards () {
      // The view model
      let vm = this

      if (_.isEmpty(vm.pileCardsResult)) {
        vm.$router.push('/deck/new')
      }

      // TODO: Refactor to reuse forEach as a reusable function
      // Get new suit order based off rotation suit
      vm.suitRank.forEach(function (item) {
        if (vm.suitRank.indexOf(vm.rotationCard.suit) === vm.suitRank.indexOf(item) || vm.suitRank.indexOf(vm.rotationCard.suit) < vm.suitRank.indexOf(item)) {
          vm.rotationSuitOrderGreater.push(item)
        } else if (vm.suitRank.indexOf(vm.rotationCard.suit) > vm.suitRank.indexOf(item)) {
          vm.rotationSuitOrderLess.push(item)
        }
      })

      vm.rotationSuit = [...vm.rotationSuitOrderGreater, ...vm.rotationSuitOrderLess]

      // // TODO: Refactor to reuse forEach as a reusable function
      // Get new number order based off rotation number
      vm.cardRank.forEach(function (item) {
        if (vm.cardRank.indexOf(vm.rotationCard.value) === vm.cardRank.indexOf(item) || vm.cardRank.indexOf(vm.rotationCard.value) < vm.cardRank.indexOf(item)) {
          vm.rotationCardOrderGreater.push(item)
        } else if (vm.cardRank.indexOf(vm.rotationCard.value) > vm.cardRank.indexOf(item)) {
          vm.rotationCardOrderLess.push(item)
        }
      })

      vm.rotationCardFinal = [...vm.rotationCardOrderGreater, ...vm.rotationCardOrderLess]

      const sortByNumber = _.sortBy(vm.pileCardsResult, function (element) {
        return vm.rotationCardFinal.indexOf(element.value)
      })

      const finalCardOrder = _.sortBy(sortByNumber, function (element) {
        return vm.rotationSuit.indexOf(element.suit)
      })

      vm.finalCardOrder = finalCardOrder
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "src/styles/abstracts/variables";

  .cardList {
    background: #d8d8d8;
    border: .1rem #979797 solid;
    padding: 4rem 7.5rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5rem;
    justify-items: center;
  }

  .content {
    padding: 2rem 18rem;
  }
</style>
