<?php
// src/DataPersister/UserDataPersister.php
namespace App\DataPersister;

use ApiPlatform\Doctrine\Common\DataPersister\DoctrineDataPersisterInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\User\UserPasswordHasherInterface;

class UserDataPersister implements DoctrineDataPersisterInterface
{
    private UserPasswordHasherInterface $passwordHasher;
    private UserRepository $userRepository;

    public function __construct(UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository)
    {
        $this->passwordHasher = $passwordHasher;
        $this->userRepository = $userRepository;
    }

    public function supports($data): bool
    {
        return $data instanceof User;
    }

    public function write($data): void
    {
        if (!$data instanceof User) {
            return;
        }

        if ($data->getPassword()) {
            $hashedPassword = $this->passwordHasher->hashPassword($data, $data->getPassword());
            $data->setPassword($hashedPassword);
        }

        $this->userRepository->save($data, true);
    }

    public function delete($data): void
    {
        if ($data instanceof User) {
            $this->userRepository->remove($data, true);
        }
    }
}
