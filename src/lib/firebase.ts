import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider with precise scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("openid");
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email");
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");
googleProvider.setCustomParameters({
  prompt: "select_account"
});

/**
 * Triggers the client-side Firebase Popup Google Login.
 * This automatically opens the native Google sign-in panel,
 * detects active Google Accounts, and returns the credentials.
 */
export async function triggerGooglePopup() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    return {
      email: user.email || "",
      displayName: user.displayName || "Google Developer",
      photoURL: user.photoURL || "",
      accessToken: (result as any)._tokenResponse?.oauthIdToken || ""
    };
  } catch (error: any) {
    console.error("Firebase Google Popup authentication failed:", error);
    throw error;
  }
}
