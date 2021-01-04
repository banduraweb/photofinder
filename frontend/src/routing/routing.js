export default function routing() {
  return {
    root: '/',
    register: '/register',
    login: '/login',
    app: '/app',
    notFound: '/404',
    liked: '/mylikes',
    profile: '/profile',
    keywords: '/mykeywords',
    forgotpassword: '/forgotpassword',
    recoverpassword: '/recoverpassword/:id',
  };
}
