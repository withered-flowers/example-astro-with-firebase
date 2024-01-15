import {
	getFirestore,
	type DocumentData,
	type WithFieldValue,
	QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export const converter = <T>() => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const dataPoint = <T extends WithFieldValue<DocumentData>>(collectionPath: string) =>
	getFirestore().collection(collectionPath).withConverter(converter<T>());
