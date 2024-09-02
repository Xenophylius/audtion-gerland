<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PaiementRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PaiementRepository::class)]
#[ApiResource]
class Paiement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?float $RAC = null;

    #[ORM\Column(nullable: true)]
    private ?float $RO = null;

    #[ORM\Column(nullable: true)]
    private ?float $RC = null;

    #[ORM\Column(nullable: true)]
    private ?float $credit = null;

    #[ORM\OneToOne(mappedBy: 'id_paiement', cascade: ['persist', 'remove'])]
    private ?Order $orders = null;

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

    public function getOrders(): ?Order
    {
        return $this->orders;
    }

    public function setOrders(Order $orders): static
    {
        // set the owning side of the relation if necessary
        if ($orders->getIdPaiement() !== $this) {
            $orders->setIdPaiement($this);
        }

        $this->orders = $orders;

        return $this;
    }
}
