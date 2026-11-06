import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { services, type Service } from './services';

function assertLiveMode() {
  if (process.env.NEXT_PUBLIC_LOCAL_PREVIEW === 'true') throw new Error('Local preview: database access is disabled.');
}

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
  assertLiveMode();
  const savedServiceRef = doc(
    db,
    SAVED_SERVICES_COLLECTION,
    `${userId}_${service.id}`
  );
  // Persist only a catalog reference, never a snapshot containing contact details.
  const savedService = {
    id: `${userId}_${service.id}`,
    userId,
    serviceId: service.id,
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
  assertLiveMode();
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
  assertLiveMode();
  // An owner-filtered query also handles missing bookmarks without relying on
  // a direct document read whose ownership cannot be proved when absent.
  const snapshot = await getDocs(query(
    collection(db, SAVED_SERVICES_COLLECTION),
    where('userId', '==', userId),
    where('serviceId', '==', serviceId),
    limit(1)
  ));
  return !snapshot.empty;
}

// Get all saved services for a user
export async function getSavedServices(
  userId: string
): Promise<SavedService[]> {
  assertLiveMode();
  const q = query(
    collection(db, SAVED_SERVICES_COLLECTION),
    where('userId', '==', userId),
    orderBy('savedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.flatMap((snapshot) => {
    const data = snapshot.data();
    // Ignore legacy embedded snapshots entirely: they can contain stale private
    // contact details. Removed catalog entries must not be resurrected either.
    const service = services.find((entry) => entry.id === data.serviceId);
    if (!service) return [];

    return [{
      id: snapshot.id,
      userId,
      serviceId: service.id,
      service,
      category: service.categories[0] || 'Other',
      savedAt:
        data.savedAt instanceof Timestamp
          ? data.savedAt.toDate()
          : new Date(data.savedAt),
    }];
  });
}

// Submit a recommendation
export async function submitRecommendation(
  userId: string,
  recommendation: Omit<
    Recommendation,
    'id' | 'userId' | 'submittedAt' | 'status'
  >
): Promise<void> {
  assertLiveMode();
  const recommendationsRef = collection(db, RECOMMENDATIONS_COLLECTION);
  const newRecommendation: Recommendation = {
    ...recommendation,
    userId,
    submittedAt: new Date(),
    status: 'pending',
  };

  // Firestore rejects undefined values. Optional recommender/contact/photo fields
  // are deliberately absent on some submission paths (for example self-listing).
  const payload = Object.fromEntries(
    Object.entries({
      ...newRecommendation,
      submittedAt: Timestamp.fromDate(newRecommendation.submittedAt),
    }).filter(([, value]) => value !== undefined)
  );
  await setDoc(doc(recommendationsRef), payload);
}
