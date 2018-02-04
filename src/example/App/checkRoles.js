export default function checkRoles(requiredRoles, userRoles) {
  let count = 0

  requiredRoles.forEach((role) => {
    if (userRoles.includes(role)) count++
  })

  return requiredRoles.length === count
}