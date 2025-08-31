// src/utils/firebaseErrors.ts
export function getFirebaseAuthErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Invalid email or password. Please try again.";

    case "auth/user-not-found":
      return "No account exists with this email. Please sign up first.";

    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";

    case "auth/weak-password":
      return "Password is too weak. Please choose a stronger one.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/network-request-failed":
      return "Network error. Please check your connection.";

    default:
      return "Something went wrong. Please try again later.";
  }
}
