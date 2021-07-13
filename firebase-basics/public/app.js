const auth = firebase.auth(); // auth sdk
// ------------authentication using google auth------------
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User Id : ${user.uid}</p>`;
    } else {
        // signed out
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = "";
    }
})

// ----------- CRUD --------------
const db = firebase.firestore(); // firestore sdk

const createThingBtn = document.getElementById("createThingBtn");
const thingsList = document.getElementById("thingsList");

let thingsRef; // collections reference (or document reference) for CRUD
let unsubscribe; // turn off listening to real time changes

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in 
        thingsRef = db.collection("products");

        createThingBtn.onclick = () => {
            thingsRef.add({
                uid: user.uid,
                name: user.displayName // enter some random value
                //createdAt: serverTimestamp() // firebase date time stamp for consistent time stamp
            });
        }
        // compound query : where we chain multiple queries
        unsubscribe = thingsRef
            .where("uid", "==", user.uid)
            .orderBy("name")
            .onSnapshot(querySnapshot => {
                const items = querySnapshot.docs.map(doc => {
                    return `<p>${doc.data().name}</p>`;
                })

                thingsList.innerHTML = items.join("");
            });

    } else {
        // signed out
        // unsubscribe to changes
        unsubscribe && unsubscribe();
    }
})