import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
});

/**
 * Define error types for better type safety and autocompletion
 **/
type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      en: string;
      es: string;
    }
  >
>;

const errorCodes = {
  USER_NOT_FOUND: {
    en: "User not found",
    es: "Usuario no encontrado",
  },
  FAILED_TO_CREATE_USER: {
    en: "Failed to create user",
    es: "Error al crear el usuario",
  },
  FAILED_TO_CREATE_SESSION: {
    en: "Failed to create session",
    es: "Error al crear la sesión",
  },
  FAILED_TO_UPDATE_USER: {
    en: "Failed to update user",
    es: "Error al actualizar el usuario",
  },
  FAILED_TO_GET_SESSION: {
    en: "Failed to get session",
    es: "Error al obtener la sesión",
  },
  INVALID_PASSWORD: {
    en: "Invalid password",
    es: "Contraseña inválida",
  },
  INVALID_EMAIL: {
    en: "Invalid email",
    es: "Correo electrónico inválido",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    en: "Invalid email or password",
    es: "Correo electrónico o contraseña inválidos",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    en: "Social account already linked",
    es: "Cuenta social ya vinculada",
  },
  PROVIDER_NOT_FOUND: {
    en: "Provider not found",
    es: "Proveedor no encontrado",
  },
  INVALID_TOKEN: {
    en: "Invalid token",
    es: "Token inválido",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    en: "id_token not supported",
    es: "id_token no soportado",
  },
  FAILED_TO_GET_USER_INFO: {
    en: "Failed to get user info",
    es: "Error al obtener información del usuario",
  },
  USER_EMAIL_NOT_FOUND: {
    en: "User email not found",
    es: "Correo electrónico del usuario no encontrado",
  },
  EMAIL_NOT_VERIFIED: {
    en: "Email not verified",
    es: "Correo electrónico no verificado",
  },
  PASSWORD_TOO_SHORT: {
    en: "Password too short",
    es: "Contraseña demasiado corta",
  },
  PASSWORD_TOO_LONG: {
    en: "Password too long",
    es: "Contraseña demasiado larga",
  },
  USER_ALREADY_EXISTS: {
    en: "User already exists.",
    es: "El usuario ya existe.",
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    en: "User already exists. Use another email.",
    es: "El usuario ya existe. Usa otro correo electrónico.",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    en: "Email can not be updated",
    es: "El correo electrónico no puede ser actualizado",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    en: "Credential account not found",
    es: "Cuenta de credencial no encontrada",
  },
  SESSION_EXPIRED: {
    en: "Session expired. Re-authenticate to perform this action.",
    es: "Sesión expirada. Vuelve a autenticarte para realizar esta acción.",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    en: "You can't unlink your last account",
    es: "No puedes desvincular tu última cuenta",
  },
  ACCOUNT_NOT_FOUND: {
    en: "Account not found",
    es: "Cuenta no encontrada",
  },
  USER_ALREADY_HAS_PASSWORD: {
    en: "User already has a password. Provide that to delete the account.",
    es: "El usuario ya tiene una contraseña. Proporciónala para eliminar la cuenta.",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang: "en" | "es" = "es") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return lang === "es" ? "Error desconocido" : "Unknown error";
};
