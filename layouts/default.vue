<template>
	<section :id='$style.container'>
    <section :id='$style.menu'>
      <Logo vertical=true size='1.4em' />
      <Drivers />
    </section>
    <section :id='$style.body'>
      <nuxt/>
    </section>
	</section>
</template>

<script>
import Logo from '../components/logo'
import Drivers from '../components/drivers'

export default {
  components: { Logo, Drivers, },
}
</script>

<style module lang=stylus>

#container
  flex: 1
  display: flex
  width: 100vw
  height: 100vh

#menu
  display: flex
  padding: 10pt
  background-color: #454545
  flex-direction: column

#body
  flex: 1
  display: flex
  justify-content: stretch
  align-items: stretch

</style>
