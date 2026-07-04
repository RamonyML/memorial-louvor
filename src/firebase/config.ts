import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração pública do projeto Firebase (o apiKey de apps web não é
// segredo — a segurança real vem das regras do Firestore, não daqui).
const firebaseConfig = {
  apiKey: 'AIzaSyC4NR2VS-vgbDCYC2RbnsVbDhIKX9_bGBU',
  authDomain: 'memorial-louvor.firebaseapp.com',
  projectId: 'memorial-louvor',
  storageBucket: 'memorial-louvor.firebasestorage.app',
  messagingSenderId: '309255072058',
  appId: '1:309255072058:web:94a1b2ba3b9bbe85abc803',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

