<template>
  <div class="card" :class="cardSuit.toLowerCase()" :data-number="cardNumber" :data-suit=cardSuit.toLowerCase()>
    <div class="card__top">{{ filterCards() }}</div>
    <div class="card__bottom">{{ filterCards() }}</div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: [
    'cardNumber',
    'cardSuit'
  ],
  methods: {
    filterCards () {
      if (this.cardNumber === '10') {
        return this.cardNumber.substring(0, 2)
      } else {
        return this.cardNumber.substring(0, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/styles/abstracts/variables";

  .card {
    background-color: $white;
    border-radius: 1.5rem;
    box-shadow: 2px 2px 6px 1px rgba(0,0,0,0.4);
    color: $grayDark;
    display: flex;
    justify-content: space-around;
    font-size: 3.8rem;
    font-weight: bold;
    min-height: 28rem;
    width: 17rem;
    padding: 0;

    [class^="card__"]::after {
      font-size: 4.5rem;
      margin-left: 0.5rem;
    }

    &.hearts {
      color: $red;

      [class^="card__"]::after {
        content: '♥';
      }
    }

    &.diamonds {
      color: $red;

      [class^="card__"]::after {
        content: '♦';
      }
    }

    &.spades {
      [class^="card__"]::after {
        content: '♠';
      }
    }

    &.clubs {
      [class^="card__"]::after {
        content: '♣';
      }
    }
  }

  .card__bottom {
    transform: rotate(-180deg);
  }
</style>
