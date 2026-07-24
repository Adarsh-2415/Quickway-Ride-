export interface AuthUser {
  id: string;
  email: string;
  role?: string;
  lastSignInAt?: string;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
  message?: string;
  user?: AuthUser;
}
