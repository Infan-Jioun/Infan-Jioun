// firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey!,
    authDomain: process.env.NEXT_PUBLIC_authDomain!,
    projectId: process.env.NEXT_PUBLIC_projectId!,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket!,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId!,
    appId: process.env.NEXT_PUBLIC_appId!,
    measurementId: process.env.NEXT_PUBLIC_measurementId!,
};


const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ✅ Analytics only if browser supports it
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
    isSupported()
        .then((supported) => {
            if (supported) {
                analytics = getAnalytics(app);
            }
        })
        .catch((err) => {
            console.warn("Analytics not supported:", err);
        });
}

export { app, analytics };
