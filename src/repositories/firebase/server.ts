import type { Example } from "@/types/data";
import { dataPoint } from "@/utils/firestore";
import { type ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import {
	// Timestamp,
	getFirestore,
} from "firebase-admin/firestore";
// import { faker } from "@faker-js/faker";

const apps = getApps();
const serviceAccount = {
	type: "service_account",
	project_id: import.meta.env.FIREBASE_PROJECT_ID,
	private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
	client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
	client_id: import.meta.env.FIREBASE_CLIENT_ID,
	auth_uri: import.meta.env.FIREBASE_AUTH_URI,
	token_uri: import.meta.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
	client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

const app =
	apps.length === 0 || !apps[0]
		? initializeApp({
				credential: cert(serviceAccount as ServiceAccount),
		  })
		: apps[0];

const db = getFirestore(app);

// const seedExampleData = async () => {
// 	const MINIMAL_DATA_ON_COLLECTIONS = 100;

// 	const collectionRef = dataPoint<Example>("examples");
// 	const querySnapshot = await collectionRef.get();

// 	if (querySnapshot.docs.length < MINIMAL_DATA_ON_COLLECTIONS) {
// 		const batch = db.batch();

// 		for (let i = 0; i < MINIMAL_DATA_ON_COLLECTIONS; i++) {
// 			const docRef = collectionRef.doc();
// 			const productName = faker.commerce.productName();

// 			batch.set(docRef, {
// 				product: productName,
// 				description: faker.commerce.productDescription(),
// 				slug: productName.toLowerCase().replace(/\s/g, "-"),
// 				createdAt: Timestamp.now(),
// 				updatedAt: Timestamp.now(),
// 			});
// 		}

// 		await batch.commit();
// 	}
// };

const getExampleData = async () => {
	const querySnapshot = await dataPoint<Example>("examples").get();
	return querySnapshot.docs
		.map((doc) => doc.data())
		.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
};

export {
	app,
	db,
	getExampleData,
	// seedExampleData
};
