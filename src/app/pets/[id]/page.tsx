import { notFound } from 'next/navigation';
import styles from './PetPage.module.css';
import { getPet, getAllPets } from '@/utils/api';
import { PetPageProps } from './interface';
import UpdatePetButton from '@/components/UpdatePetPutton/UpdatePetButton';

export default async function PetPage({ params }: PetPageProps) {
  const pet = await getPet(params.id);

  if (!pet) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return styles.available;
      case 'pending':
        return styles.pending;
      case 'sold':
        return styles.sold;
      default:
        return '';
    }
  };

  return (
    <div className={styles.petPage}>
      <h1 className={styles.petName}>{pet.name}</h1>
      <p className={`${styles.status} ${getStatusColor(pet.status)}`}>
        Status: {pet.status}
      </p>
      <UpdatePetButton petId={pet.id} />
    </div>
  );
}

export async function generateStaticParams() {
  const pets = await getAllPets();
  return pets.map((pet) => ({
    id: pet.id.toString(),
  }));
}

export const revalidate = 15;
