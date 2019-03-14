<template>
	<section :id='$style.container'>
    <section :id='$style.menu'>
      <Logo margin='5pt' vertical=true size='1.2em' />
      <Controllers />
    </section>
    <section :id='$style.body'>
      <nuxt/>
    </section>
	</section>
</template>

<script>
import Logo from '../components/logo'
import Controllers from '../components/controllers'

export default {
  components: { Logo, Controllers, },
}
</script>

<style module lang=stylus>

#container
  flex: 1
  position: relative
  display: flex
  width: 100vw
  height: 100vh

#menu
  display: flex
  background-color: #454545
  flex-direction: column

#body
  flex: 1
  display: flex
  justify-content: stretch
  align-items: stretch

</style>
