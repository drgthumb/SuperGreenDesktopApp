export default function({store, route, redirect}) {
  if (route.path != '/welcome' && store.state.localstorage.first_start) {
    redirect('/welcome')
  }
}
