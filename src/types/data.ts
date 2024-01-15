import type { Timestamp } from "firebase-admin/firestore";

export type Example = {
	product: string;
	description: string;
	slug: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
};
