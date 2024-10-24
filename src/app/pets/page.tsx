'use client';

import { getAllPets } from '@/utils/api';
import styles from './PetsPage.module.css';
import DeletePetButton from '@/components/DeletePetButton/DeletePetButton';
import { useEffect, useState } from 'react';
import { Pet } from '@/types/interfaces';
import UpdatePetButton from '@/components/UpdatePetPutton/UpdatePetButton';

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const allPets = await getAllPets();
      const uniquePets = allPets
        .filter(
          (pet, index, self) => index === self.findIndex((p) => p.id === pet.id)
        )
        .sort((a, b) => a.id - b.id);
      setPets(uniquePets);
    } catch (error) {
      console.error('Не удалось получить питомцев:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <h1>Питомцы</h1>
      {loading ? (
        <p>Загрузка питомцев...</p>
      ) : pets.length === 0 ? (
        <p>Питомцы в данный момент недоступны.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>ID</th>
              <th>Обновить имя</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) =>
              pet.id && pet.name ? (
                <tr key={pet.id}>
                  <td>
                    <a href={`/pets/${pet.id}`} className={styles.link}>
                      {pet.name}
                    </a>
                  </td>
                  <td>{pet.id}</td>
                  <td>
                    <UpdatePetButton petId={pet.id} onUpdate={fetchPets} />
                  </td>
                  <td>
                    <DeletePetButton id={pet.id} onDelete={fetchPets} />
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
