const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase); // initialize admin app

// use admin sdk , only in backend environment, bypass all security rules
// function send message
exports.sendMessage = functions.firestore
    .document("products/{productId}")
    // run the function everytime a new document (product id) is created
    .onCreate((e) => {
      const docId = e.params;
      const name = e.data.data().name;
      const prodRef = admin.firestore().collection("products").doc(docId);

      return prodRef.update({message: `Nice ${name}! - Cloud functions`});
    });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
