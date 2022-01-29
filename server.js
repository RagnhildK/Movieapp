// import { MongoClient } from "mongodb";

// const uri =
//   "mongodb+srv://RagnhildK:RaggenHanna@cluster0.uidau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let sessionCollection;
// let userCollection;

// const connect = async () => {
//   await client.connect();
//   console.log("connected");
//   sessionCollection = client.db("movieApp").collection("session");
//   userCollection = client.db("movieApp").collection("users");
// };
// const connectionPromise = connect();

// // client.close();

// `
// session : {
//     ownerUsername: aka id string,
//     moviesTBRated: [movieID (Number)],
//     participants: {
//         username(string): {
//             movieID(string): rating(int)
//         }
//     }
// ,}

// Example:

// [
//   {
//       ownerUsername: ozan,
//       moviesTBRated: [1,2,3,4],
//       participants: {
//           ragnhild: {
//               1: 5,
//               2: 2,...
//           },
//           hannah: {
//               1: 1,
//               ...
//           },
//           ozan: null, // Ozan is lazy
//       }
//   },
// ]

// users : [{username: }, {username: }, ...]

// users: [{username: "Ozan"}, {username: "Ragnhild"}, {username: "Hanna"}]
// `;

// //TODO: store username in asyncstorage as well

// //when create session screen & join session screen
// //returnerer false hvis det ikke går
// //returnerer true hvis det funker å sette ønsket brukernavn
// export const registerUser = async (username) => {
//   await connectionPromise;
//   if ((await userCollection.count({ username })) > 0) {
//     console.log(username + " username is used");
//     return false;
//   } else {
//     console.log(username + " username is avaliable");
//     await userCollection.insertOne({ username });
//     return true;
//   }
// };

// //when users clicks create session
// export const createASession = async (ownerUsername, moviesTBRated) => {
//   await connectionPromise;
//   // Insert a document with the owners username
//   await deleteASession(ownerUsername);
//   await sessionCollection.insertOne({
//     ownerUsername,
//     moviesTBRated,
//     partipicants: {},
//   });
//   await joinASession(ownerUsername, ownerUsername);
// };

// export const joinASession = async (myUsername, ofUsername) => {
//   await connectionPromise;
//   // Check the existance of the session
//   // Add a username to the session document ofUsername
//   if ((await sessionCollection.count({ ownerUsername: ofUsername })) <= 0) {
//     console.log("There is no session made by " + ofUsername);
//     return false;
//   } else {
//     const key = `partipicants.${myUsername}`;
//     const set = {};
//     set[key] = null;
//     const updateDocument = {
//       $set: set,
//     };
//     const filterDocument = { ownerUsername: ofUsername };
//     console.log(filterDocument, updateDocument);
//     await sessionCollection.updateOne(filterDocument, updateDocument);
//     return true;
//   }
// };

// //should be called when a user submits their ratings
// export const updateRatings = async (myUsername, ofUsername, ratings) => {
//   await connectionPromise;
//   // Save the ratings of the user in the session of the
//   const key = `partipicants.${myUsername}`;
//   const set = {};
//   set[key] = ratings;
//   const updateDocument = {
//     $set: set,
//   };
//   const filterDocument = { ownerUsername: ofUsername };
//   await sessionCollection.updateOne(filterDocument, updateDocument);
// };

// //should be called by another business logic. run periodically when owner is done rating
// export const getRatings = async (myUsername, ofUsername) => {
//   await connectionPromise;
//   //return an object with all participants and their ratings
//   //check that the user that asks for ratings is the owner of the session
//   if (myUsername !== ofUsername) {
//     console.log("Error! You are not the owner of this session");
//     return null;
//   } else {
//     const result = await sessionCollection.findOne({
//       ownerUsername: ofUsername,
//     });
//     return result.partipicants;
//   }
// };

// //should be called when owner of session clickes "end session" on results screen
// export const deleteASession = async (ownerUsername) => {
//   await connectionPromise;
//   await sessionCollection.deleteMany({
//     ownerUsername,
//   });
// };

// //await registerUser("Ozan");
// //await registerUser("Raggen");
// //await registerUser("Ozan");
// // await createASession("Ozan", [1, 2, 3]);
// // await joinASession("Ragnhild", "Ozan");
// // await joinASession("Ragnhild", "Maia");
// // await createASession("Maia", [4, 2, 3]);
// // await joinASession("Ragnhild", "Maia");

// // await updateRatings("Ragnhild", "Ozan", { 1: 5, 2: 2, 3: 1 });
// // await createASession("Hanna", [3, 4, 5]);
// // await updateRatings("Hanna", "Hanna", { 3: 2, 4: 5, 5: 4 });
// // await getRatings("Hanna", "Ozan");
// // await getRatings("Ozan", "Ozan");
// // await deleteASession("Hanna");
