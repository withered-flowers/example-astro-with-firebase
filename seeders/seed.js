// ! WARNING: This will only work on nodejs
// ! DO NOT USE BUN
import { faker } from "@faker-js/faker";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const serviceAccount = {
	type: "service_account",
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_PRIVATE_KEY
		? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
		: undefined,
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

const app = initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore(app);

const MINIMAL_DATA_ON_COLLECTIONS = 100;

const collectionRef = db.collection("examples");
const batch = db.batch();

for (let i = 0; i < MINIMAL_DATA_ON_COLLECTIONS; i++) {
	const docRef = collectionRef.doc();
	const productName = faker.commerce.productName();

	batch.set(docRef, {
		product: productName,
		description: faker.commerce.productDescription(),
		slug: productName.toLowerCase().replace(/\s/g, "-"),
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now(),
	});
}

await batch.commit();

console.log("Data has been seeded");
