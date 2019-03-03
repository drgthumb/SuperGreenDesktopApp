<template>
  <span :id='$style.supergreenlab' :style='{"font-size": size, color, margin}'>
    <span :class='vertical == true ? $style.supersmallword : ""'>S<span :class='$style.supersmall'>upe</span>r</span><br v-if='vertical != false' />
    <span :class='$style.supergreen'>G<span :class='$style.supersmall'>ree</span>n</span><br v-if='vertical != false' />
    <span>L<span :class='$style.supersmall'>a</span>b</span>
  </span>
</template>

<script>
export default {
  props: {
    vertical: {
      default: false,
    },
    size: {
      default: '1em',
    },
    color: {
      default: 'white',
    },
    margin: {
      default: '0pt',
    },
  }
}
</script>

<style module lang=stylus>

#supergreenlab
  font-family: 'PlumeAd'
  text-transform: uppercase
  letter-spacing: 1pt
  text-align: center

.supergreen
  color: #3BB30B

.supersmall
  font-size: 0.9em

.supersmallword
  font-size: 0.85em

</style>
