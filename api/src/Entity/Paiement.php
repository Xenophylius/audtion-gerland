<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PaiementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PaiementRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
)]
class Paiement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read'])]
    private ?int $id = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(nullable: true)]
    private ?float $RAC = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(nullable: true)]
    private ?float $RO = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(nullable: true)]
    private ?float $RC = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(nullable: true)]
    private ?float $credit = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRAC(): ?float
    {
        return $this->RAC;
    }

    public function setRAC(?float $RAC): static
    {
        $this->RAC = $RAC;

        return $this;
    }

    public function getRO(): ?float
    {
        return $this->RO;
    }

    public function setRO(?float $RO): static
    {
        $this->RO = $RO;

        return $this;
    }

    public function getRC(): ?float
    {
        return $this->RC;
    }

    public function setRC(?float $RC): static
    {
        $this->RC = $RC;

        return $this;
    }

    public function getCredit(): ?float
    {
        return $this->credit;
    }

    public function setCredit(?float $credit): static
    {
        $this->credit = $credit;

        return $this;
    }
}
