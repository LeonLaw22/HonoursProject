const admin = require("./node_modules/firebase-admin");

const serviceAccount = require("./sensor-chatbot-wtrssd-firebase-adminsdk-w1pg3-260c6fc43c.json");

const data = require("./TempData.json");

const collectionKey = "Temperature";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sensor-chatbot-wtrssd.firebaseio.com/"
})

const firestore = admin.firestore();
const settings = {timestanpInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        firestore
        .collection(collectionKey)
        .doc(docKey)
        .set(data[docKey])
        .then((res) => {
            console.log("Document " + docKey + " successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        }); 
    });
}