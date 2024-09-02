<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InsuranceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InsuranceRepository::class)]
#[ApiResource( normalizationContext: ['groups' => ['read']],)]
class Insurance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read'])]
    private ?int $id = null;

    #[Groups(['read'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['read'])]
    #[ORM\Column]
    private ?float $price_ttc = null;

    #[Groups(['read'])]
    #[ORM\Column]
    private ?float $tva = null;

    public function __construct()
    {

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPriceTtc(): ?float
    {
        return $this->price_ttc;
    }

    public function setPriceTtc(float $price_ttc): static
    {
        $this->price_ttc = $price_ttc;

        return $this;
    }

    public function getTva(): ?float
    {
        return $this->tva;
    }

    public function setTva(float $tva): static
    {
        $this->tva = $tva;

        return $this;
    }
}
