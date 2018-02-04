import Director from 'director/build/director'
const DirectorRouter = Director.Router

var router = null

function initRouter(routes, config) {
  if (getRouter()) return getRouter()
    
  router = DirectorRouter(routes)
  router.configure(config)
  router.init()
  return router
}

function getRouter() {
  return router
}

function goTo(path) {
  setRouteFix()
  getRouter().setRoute(path)
}

// window.onpopstate pode estar indisponivel 
// durante o load da pagina.
// Por consequencia, redirects imediatos no carregamento
// podem não funcionar
function setRouteFix() {
  // Verifica se já redefiniu
  if (getRouter().setRoute.name==='customSetRoute') return

  const oldSetRoute = getRouter().setRoute;
  getRouter().setRoute = function customSetRoute(route) {
    var isDirectorReady = callback => {
      var interval;

      if (window.onpopstate !== null) {
        callback();
        return;
      }
      interval = setInterval(function () {
        if (window.onpopstate !== null) {
          callback();
          clearInterval(interval);
        }
      }, 100);
    }

    isDirectorReady(() => {
      oldSetRoute.call(getRouter(), route);
    });
  }
}

export { initRouter, getRouter, goTo }