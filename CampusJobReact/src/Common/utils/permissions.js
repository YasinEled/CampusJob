// utils/permissions.js

/**
 * Devuelve true si el usuario puede ver el ítem
 * @param {number} userType - El tipo de usuario (0-4)
 * @param {number[]} allowedTypes - Array de tipos de usuario permitidos
 */
// utils/permissions.js
export function canSee(userType, allowedTypes = []) {
  // Convertir a array si viene como string
  const typesArray = Array.isArray(allowedTypes) 
    ? allowedTypes 
    : String(allowedTypes).split(',').map(Number);

  if (userType === 4) return true;
  if (userType === 3) return !typesArray.includes(4);
  return typesArray.includes(userType);
}
