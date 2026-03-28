import * as admin from 'firebase-admin';
import * as path from 'path';

// 1. Initialize (needs export from setup.json of items)
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function basicUpload() {
  // 2. Load data from a specified file (e.g., "setup.ts")
  const fileArg = process.argv[2]; // the specified file in question
  const dataPath = path.resolve(__dirname, 'data', fileArg);

  // 2.5(?) check if upload is meant to run as path, in which case "body" field is read as a filepath
  const hasPathFlag = process.argv.slice(2).includes('--path') || process.argv.slice(2).includes('-p'); 
  const { items } = require(dataPath);

  const batch = db.batch();

  
  items.forEach((item: any) => {
    // We put everything in one single collection called "compendium_entries"
    const docRef = db.collection('compendium_entries').doc(item.id);
    if (item.id === "body" && hasPathFlag) {
      
    } else {
      batch.set(docRef, item);
    }
  });

  await batch.commit();
  console.log(`Successfully uploaded ${items.length} items to Firestore!`);
}

basicUpload().catch(console.error);