import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://RagnhildK:RaggenHanna@cluster0.uidau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("start");
await client.connect();
console.log("connected");

const sessionCollection = client.db("movieApp").collection("session");
// client.close();
`
session : {
    ownerUsername: aka id string,
    moviesTBRated: [movieID (Number)],
    participants: {
        username(string): {
            movieID(string): rating(int)
        }
    }
,}

Example:

{
    ownerUsername: ozan,
    moviesTBRated: [1,2,3,4],
    participants: {
        ragnhild: {
            1: 5,
            2: 2,...
        },
        hannah: {
            1: 1,
            ...
        },
        ozan: null, // Ozan is lazy
    }
}
`;

const createASession = async (ownerUsername, moviesTBRated) => {
  // Insert a document with the owners username
  await deleteASession(ownerUsername);
  await sessionCollection.insertOne({
    ownerUsername,
    moviesTBRated,
    partipicants: {},
  });
  await joinASession(ownerUsername, ownerUsername);
};

const joinASession = async (myUsername, ofUsername) => {
  // Check the existance of the session
  // Add a username to the session document ofUsername
  const key = `partipicants.${myUsername}`;
  const set = {};
  set[key] = null;
  const updateDocument = {
    $set: set,
  };
  const filterDocument = { ownerUsername: ofUsername };
  console.log(filterDocument, updateDocument);
  await sessionCollection.updateOne(filterDocument, updateDocument);
};

const updateRatings = async (myUsername, ofUsername, ratings) => {
  // Save the ratings of the user in the session of the
  const key = `partipicants.${myUsername}`;
  const set = {};
  set[key] = ratings;
  const updateDocument = {
    $set: set,
  };
  const filterDocument = { ownerUsername: ofUsername };
  await sessionCollection.updateOne(filterDocument, updateDocument);
};

const getRatings = async (ofUsername) => {
  //return an object with all participants and their ratings
  const results = await (
    await sessionCollection.find({ ownerUsername: ofUsername })
  ).toArray();
  console.log(results[0].partipicants);
  return results[0].partipicants;
};

const deleteASession = async (ownerUsername) => {
  await sessionCollection.deleteMany({
    ownerUsername,
  });
};

await createASession("Ozan", [1, 2, 3]);
await joinASession("Ragnhild", "Ozan");
await updateRatings("Ragnhild", "Ozan", { 1: 5, 2: 2, 3: 1 });
await createASession("Hanna", [3, 4, 5]);
await updateRatings("Hanna", "Hanna", { 3: 2, 4: 5, 5: 4 });
await getRatings("Ozan");
await deleteASession("Hanna");
