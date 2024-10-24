import { Pet } from '@/types/interfaces';

export async function getAllPets(): Promise<Pet[]> {
  try {
    const res = await fetch(
      'https://petstore.swagger.io/v2/pet/findByStatus?status=pending,sold,available'
    );
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const pets: Pet[] = await res.json();

    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
}

export async function getPet(id: string): Promise<Pet | null> {
  const res = await fetch(`https://petstore.swagger.io/v2/pet/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function deletePet(id: string): Promise<boolean> {
  const res = await fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    return true;
  } else {
    console.error(`Failed to delete pet with id ${id}: ${res.status}`);
    return false;
  }
}

export async function updatePet(id: number): Promise<boolean> {
  const updatedPetData = {
    id: id,
    name: 'Тузик',
    status: 'available',
  };

  const res = await fetch(`https://petstore.swagger.io/v2/pet`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPetData),
  });

  if (res.ok) {
    return true;
  } else {
    console.error(`Failed to update pet with id ${id}: ${res.status}`);
    return false;
  }
}
