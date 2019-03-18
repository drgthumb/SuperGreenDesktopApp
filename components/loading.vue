<template>
  <div :id='$style.loading'>
    <div :id='$style.loadingpic'></div>
    {{ label }}
  </div>
</template>

<script>
export default {
  props: ['label']
}
</script>

<style module lang=stylus>

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}

#loading
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  border-radius: 3pt
  background-color: rgba(255, 255, 255, 0.8)
  z-index: 3

#loadingpic
  width: 20pt
  height: 20pt
  background-image: url('~/assets/img/loading.svg')
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  animation: rotation 2s infinite 

</style>
