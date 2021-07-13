// document.addEventListener("DOMContentLoaded",(e) => {
//     const app = firebase.app();
    
//     const db = firebase.firestore();

//     const myPost = db.collection("Docs").doc('firstdoc');
//     // returns a promise
//     // myPost.get()
//     //     .then( doc => {
//     //         const data = doc.data();
//     //         document.write( data.title + `<br>`);
//     //         document.write( data.caption );
//     //     })

//     // every time the data is modified every user will  be notified
//     // it returns a real time string
//     myPost.onSnapshot( doc => {
//         const data = doc.data();

//         document.querySelector("#title").innerHTML = data.title;

//         // document.write( data.title + `<br>`);
//         // document.write( data.caption + `<br>` );
//     })
// })

// function googleLogin () {
//     const provider = new firebase.auth.GoogleAuthProvider();

//     firebase.auth().signInWithPopup(provider)
//         .then((res) => {
//             const user = res.user;
//             document.write(`Welcome, ${user.displayName}`);
//             console.log(res);
//         }).catch(console.log)

// }

// function updatePost (e) {
//     const db = firebase.firestore();
//     const myPost = db.collection('Docs').doc("firstdoc");
//     myPost.update({ title : e.target.value });
// }

// -----------------updating , ordering , retrieving multiple data from different collection-----------------

// document.addEventListener("DOMContentLoaded", (e) => {
//     const app = firebase.app();

//     const db = firebase.firestore();
//     const productRef = db.collection('products');

//     // const query = productRef.where("price", '>', 10);
//     const query = productRef.orderBy('price', 'desc').limit(1); // orders and limits the data returned 

//     query.get()
//         .then(products => {
//             products.forEach(doc => {
//                 data = doc.data();
//                 document.write(`${data.name} at ${data.price} <br>`)
//             })
//         })

// })

//  -----------------Using storage to upload data on firebase storage---------------
// document.addEventListener("DOMContentLoaded", e => {

//     const app = firebase.app();

// });
// // image upload and retrieving its url
// function uploadFile(files){
//     const storageRef = firebase.storage().ref(); // ref the path of storage bucket
//     const horseRef = storageRef.child('horse.jpg');

//     const file = files.item(0);
//     const task = horseRef.put(file);

//     task.then(snapshot => {
//         console.log(snapshot);
//         snapshot.ref.getDownloadURL().then(url => {
//             document.querySelector("#imgUpload").setAttribute('src',url);
//         });
//     })

// }

// cloud functions
document.addEventListener("DOMContentLoaded", e=> {
    const app = firebase.app();
})
