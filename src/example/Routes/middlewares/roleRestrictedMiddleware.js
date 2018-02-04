import checkRoles from '../../App/checkRoles'
import { redirect } from '../../../component'

export default function build(redirectionPath) {
  return function roleRestrictedMiddleware(injectedProps, params, queryParams, route) {
    if (route.requiredRoles && injectedProps.userRoles){
      console.log(':: roleRestrictedMiddleware ::');
      const isAllowed = checkRoles(route.requiredRoles, injectedProps.userRoles)

      if (!isAllowed){
        redirect(redirectionPath)
        return isAllowed
      }
    }
  }
}