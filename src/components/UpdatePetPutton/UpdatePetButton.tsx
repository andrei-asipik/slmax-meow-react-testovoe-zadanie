'use client';

import { FC } from 'react';
import { updatePet } from '@/utils/api';
import { UpdatePetButtonProps } from './interface';

const UpdatePetButton: FC<UpdatePetButtonProps> = ({ petId, onUpdate }) => {
  const handleUpdate = async () => {
    const success = await updatePet(petId);
    if (onUpdate && success) {
      onUpdate();
    }
  };

  return <button onClick={handleUpdate}>Изменить имя на Тузик</button>;
};

export default UpdatePetButton;
