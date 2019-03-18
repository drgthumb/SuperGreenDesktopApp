export default function({store, route, redirect}) {
  if (route.path != '/welcome' && store.state.app.first_start) {
    redirect('/welcome')
  }
}
