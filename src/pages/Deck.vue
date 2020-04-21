<template>
  <div>
    <Header title="Cards"></Header>
    <div class="container-fluid page">
      <form @submit.prevent="formSubmit">
        <div class="deck">

            <div class="deck__inputs">
            <div class="card">
              <div class="card__options">
                <label for="card1">Card 1</label>
                <input
                  id="card1"
                  v-model="card1"
                  type="text"
                  name="card1"
                >
              </div>
              <div class="card__options">
                <label for="card2">Card 2</label>
                <input
                  id="card2"
                  v-model="card2"
                  type="text"
                  name="card2"
                >
              </div>
              <div class="card__options">
                <label for="card3">Card 3</label>
                <input
                  id="card3"
                  v-model="card3"
                  type="text"
                  name="card3"
                >
              </div>
              <div class="card__options">
                <label for="card4">Card 4</label>
                <input
                  id="card4"
                  v-model="card4"
                  type="text"
                  name="card4"
                >
              </div>
              <div class="card__options">
                <label for="card5">Card 5</label>
                <input
                  id="card5"
                  v-model="card5"
                  type="text"
                  name="card5"
                >
              </div>
              <div class="card__options">
                <label for="card6">Card 6</label>
                <input
                  id="card6"
                  v-model="card6"
                  type="text"
                  name="card6"
                >
              </div>
              <div class="card__options">
                <label for="card7">Card 7</label>
                <input
                  id="card7"
                  v-model="card7"
                  type="text"
                  name="card7"
                >
              </div>
              <div class="card__options">
                <label for="card8">Card 8</label>
                <input
                  id="card8"
                  v-model="card8"
                  type="text"
                  name="card8"
                >
              </div>
              <div class="card__options">
                <label for="card9">Card 9</label>
                <input
                  id="card9"
                  v-model="card9"
                  type="text"
                  name="card9"
                >
              </div>
              <div class="card__options">
                <label for="card10">Card 10</label>
                <input
                  id="card10"
                  v-model="card10"
                  type="text"
                  name="card10"
                >
              </div>
            </div>

            <div class="rotationCard">
                <label for="rotationCard">Rotation Card</label>
                <input
                  id="rotationCard"
                  v-model="rotationCard"
                  type="text"
                  name="rotationCard"
                  required
              >
            </div>

          </div>

          <div class="deck__submit -text-center">
            <input class="btn-primary" type="submit" value="Submit">
          </div>

        </div>

      </form>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../components/layout/Header';
export default {
  name: 'Deck',
  components: { Header },
  computed: {
    ...mapState([
      'deckId'
    ])
  },
  data () {
    return {
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      card5: '',
      card6: '',
      card7: '',
      card8: '',
      card9: '',
      card10: '',
      rotationCard: '',
      suits: {
        'H': 'HEARTS',
        'D': 'DIAMONDS',
        'C': 'CLUBS',
        'S': 'SPADES'
      }
    }
  },
  methods: {
    formSubmit (e) {
      e.preventDefault()

      let cardsList = ''
      let i

      // Creating pile of cards comma separated list for API
      for (i = 0; i <= 9; i++) {
        let cardValue = e.target.elements[i].value
        cardValue = cardValue.replace('10', '0')

        if (cardValue !== '') {
          if (i === 0) {
            cardsList += cardValue
          } else {
            cardsList += ',' + cardValue
          }
        }
      }

      this.$store.commit('setPileCards', cardsList)

      // Save rotation card as an array
      let rotationCardSplit = this.rotationCard.split('')
      let rotationCardResult = {
        'value': rotationCardSplit[0],
        'suit': this.suits[rotationCardSplit[1].toUpperCase()]
      }

      this.$store.commit('setRotationCard', rotationCardResult)

      // Make calls to retrieve deck of cards
      this.$store.dispatch('newDeck')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/styles/abstracts/variables";

  .deck {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 260px); // offset header height and content padding
  }

  .card, .rotationCard {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.8rem;
  }

  .rotationCard {
    margin-top: 9rem;

    label {
      color: $grayDark;
      font-size: 2.7rem;
      font-weight: bold;
      grid-column-start: 2;
      text-transform: none;
    }
  }
</style>
