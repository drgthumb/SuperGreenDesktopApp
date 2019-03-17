<template>
  <AddControllerItem title='Already connected' button=''>
    <input v-model='url' type='text' placeholder='IP or name.local' />
  </AddControllerItem>
</template>

<script>
export default {
  data: () => ({
    url: '',
  }),
  methods: {
    wifi() {
      this.$store.commit('controllers/configure_search_ap_controller', {url: this.$data.url, is_sta: true})
      this.$router.push('/new-step-plug')
    },
  },
}
</script>

<style>

#container
  flex: 1

</style>
