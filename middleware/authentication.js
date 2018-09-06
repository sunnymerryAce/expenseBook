import ls from 'localstorage-ttl';

export default function({ store, route, redirect }) {
  if (!ls.get('userId') && route.name !== 'login') {
    return redirect('/login');
  }
  if (ls.get('userId') && route.name === 'login') {
    return redirect('/');
  }
}
