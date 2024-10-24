'use client';

import { deletePet } from '@/utils/api';
import { DeletePetButtonProps } from './interface';

export default function DeletePetButton({
  id,
  onDelete,
}: DeletePetButtonProps) {
  const handleDelete = async () => {
    await deletePet(id.toString());
    onDelete();
  };

  return <button onClick={handleDelete}>Удалить</button>;
}
