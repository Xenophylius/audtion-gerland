<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
)]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read'])]
    private ?Customer $id_customer = null;

    #[Groups(['read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $mutual = null;

    #[Groups(['read'])]
    #[ORM\ManyToOne]
    private ?User $id_name_audio = null;

    #[Groups(['read'])]
    #[ORM\ManyToOne]
    private ?Insurance $id_insurance = null;

    #[Groups(['read'])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Paiement $id_paiement = null;

    #[Groups(['read'])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Center $id_center_pec = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdCustomer(): ?Customer
    {
        return $this->id_customer;
    }

    public function setIdCustomer(?Customer $id_customer): static
    {
        $this->id_customer = $id_customer;

        return $this;
    }

    public function getMutual(): ?string
    {
        return $this->mutual;
    }

    public function setMutual(?string $mutual): static
    {
        $this->mutual = $mutual;

        return $this;
    }

    public function getIdNameAudio(): ?User
    {
        return $this->id_name_audio;
    }

    public function setIdNameAudio(?User $id_name_audio): static
    {
        $this->id_name_audio = $id_name_audio;

        return $this;
    }

    public function getIdInsurance(): ?insurance
    {
        return $this->id_insurance;
    }

    public function setIdInsurance(?insurance $id_insurance): static
    {
        $this->id_insurance = $id_insurance;

        return $this;
    }

    public function getIdPaiement(): ?Paiement
    {
        return $this->id_paiement;
    }

    public function setIdPaiement(?Paiement $id_paiement): static
    {
        $this->id_paiement = $id_paiement;

        return $this;
    }

    public function getIdCenterPec(): ?Center
    {
        return $this->id_center_pec;
    }

    public function setIdCenterPec(?Center $id_center_pec): static
    {
        $this->id_center_pec = $id_center_pec;

        return $this;
    }
}
