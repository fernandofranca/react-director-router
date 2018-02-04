export default function logMiddleware(injectedProps, params, queryParams, route) {
  console.log(':: Log Middleware ::', route.viewClass.name);
}