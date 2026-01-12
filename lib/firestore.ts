import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Service } from './services';

const SAVED_SERVICES_COLLECTION = 'savedServices';
const RECOMMENDATIONS_COLLECTION = 'recommendations';

export interface SavedService {
  id: string;
  userId: string;
  serviceId: number;
  service: Service;
  savedAt: Date;
  category: string; // Primary category for organization
}

export interface Recommendation {
  id?: string;
  userId: string;
  userType: 'recommender' | 'service-personnel';
  name: string;
  categories: string[];
  workType: 'Full-time' | 'Part-time';
  description: string;
  location: string;
  phoneNumber: string;
  phoneNumberWhatsApp: boolean;
  recommenderPhone?: string;
  recommenderPhoneWhatsApp?: boolean;
  photoUrl?: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

// Save a service to user's dashboard
export async function saveService(
  userId: string,
  service: Service
): Promise<void> {
  const savedServiceRef = doc(
    db,
    SAVED_SERVICES_COLLECTION,
    `${userId}_${service.id}`
  );
  const savedService: SavedService = {
    id: `${userId}_${service.id}`,
    userId,
    serviceId: service.id,
    service,
    savedAt: new Date(),
    category: service.categories[0] || 'Other',
  };

  await setDoc(savedServiceRef, {
    ...savedService,
    savedAt: Timestamp.fromDate(savedService.savedAt),
  });
}

// Remove a service from user's dashboard
export async function unsaveService(
  userId: string,
  serviceId: number
): Promise<void> {
  const savedServiceRef = doc(
    db,
    SAVED_SERVICES_COLLECTION,
    `${userId}_${serviceId}`
  );
  await deleteDoc(savedServiceRef);
}

// Check if a service is saved
export async function isServiceSaved(
  userId: string,
  serviceId: number
): Promise<boolean> {
  const savedServiceRef = doc(
    db,
    SAVED_SERVICES_COLLECTION,
    `${userId}_${serviceId}`
  );
  const docSnap = await getDoc(savedServiceRef);
  return docSnap.exists();
}

// Get all saved services for a user
export async function getSavedServices(
  userId: string
): Promise<SavedService[]> {
  const q = query(
    collection(db, SAVED_SERVICES_COLLECTION),
    where('userId', '==', userId),
    orderBy('savedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      savedAt: data.savedAt instanceof Timestamp 
        ? data.savedAt.toDate() 
        : new Date(data.savedAt),
    } as SavedService;
  });
}

// Submit a recommendation
export async function submitRecommendation(
  userId: string,
  recommendation: Omit<Recommendation, 'id' | 'userId' | 'submittedAt' | 'status'>
): Promise<void> {
  const recommendationsRef = collection(db, RECOMMENDATIONS_COLLECTION);
  const newRecommendation: Recommendation = {
    ...recommendation,
    userId,
    submittedAt: new Date(),
    status: 'pending',
  };

  await setDoc(doc(recommendationsRef), {
    ...newRecommendation,
    submittedAt: Timestamp.fromDate(newRecommendation.submittedAt),
  });
}

