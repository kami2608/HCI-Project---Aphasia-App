import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";

async function addUserData(userData) {
    try {
        const docRef = doc(FIREBASE_DB, "Users", userData.id);
        await setDoc(docRef, userData);
        console.log("Saving data successfully!");
    } catch (error) {
        console.error("Error saving data: ", error);
    }
}