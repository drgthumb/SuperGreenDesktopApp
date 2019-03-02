<template>
	<div>
    <div id='menu'>
      <Drivers />
    </div>
		<nuxt/>
	</div>
</template>

<script>
import Drivers from '../components/drivers'

export default {
  components: { Drivers, },
}
</script>

<style module lang=stylus>
</style>
