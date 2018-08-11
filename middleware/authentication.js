export default function({ store, route, redirect }) {
  if (!store.getters.isAuthenticated && route.name !== 'login') {
    return redirect('/login');
  }
  if (store.getters.isAuthenticated && route.name === 'login') {
    return redirect('/');
  }
}
