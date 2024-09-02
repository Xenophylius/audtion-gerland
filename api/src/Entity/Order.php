<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?customer $id_customer = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $id_name_audio = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    private ?Insurance $id_insurance = null;

    /**
     * @var Collection<int, Device>
     */
    #[ORM\ManyToMany(targetEntity: Device::class, inversedBy: 'orders')]
    private Collection $id_device;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name_accessorie = null;

    #[ORM\Column(nullable: true)]
    private ?float $price_accessorie = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $mutual = null;

    #[ORM\Column(nullable: true)]
    private ?float $remise = null;

    #[ORM\Column]
    private ?float $price_ttc = null;

    #[ORM\OneToOne(inversedBy: 'orders', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Paiement $id_paiement = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column(length: 255)]
    private ?string $paiement_type = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Center $id_center_pec = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $modified_at = null;

    public function __construct()
    {
        $this->id_device = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdCustomer(): ?customer
    {
        return $this->id_customer;
    }

    public function setIdCustomer(?customer $id_customer): static
    {
        $this->id_customer = $id_customer;

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

    public function getIdInsurance(): ?Insurance
    {
        return $this->id_insurance;
    }

    public function setIdInsurance(?Insurance $id_insurance): static
    {
        $this->id_insurance = $id_insurance;

        return $this;
    }

    /**
     * @return Collection<int, Device>
     */
    public function getIdDevice(): Collection
    {
        return $this->id_device;
    }

    public function addIdDevice(Device $idDevice): static
    {
        if (!$this->id_device->contains($idDevice)) {
            $this->id_device->add($idDevice);
        }

        return $this;
    }

    public function removeIdDevice(Device $idDevice): static
    {
        $this->id_device->removeElement($idDevice);

        return $this;
    }

    public function getNameAccessorie(): ?string
    {
        return $this->name_accessorie;
    }

    public function setNameAccessorie(?string $name_accessorie): static
    {
        $this->name_accessorie = $name_accessorie;

        return $this;
    }

    public function getPriceAccessorie(): ?float
    {
        return $this->price_accessorie;
    }

    public function setPriceAccessorie(?float $price_accessorie): static
    {
        $this->price_accessorie = $price_accessorie;

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

    public function getRemise(): ?float
    {
        return $this->remise;
    }

    public function setRemise(?float $remise): static
    {
        $this->remise = $remise;

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

    public function getIdPaiement(): ?Paiement
    {
        return $this->id_paiement;
    }

    public function setIdPaiement(Paiement $id_paiement): static
    {
        $this->id_paiement = $id_paiement;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getPaiementType(): ?string
    {
        return $this->paiement_type;
    }

    public function setPaiementType(string $paiement_type): static
    {
        $this->paiement_type = $paiement_type;

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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getModifiedAt(): ?\DateTimeImmutable
    {
        return $this->modified_at;
    }

    public function setModifiedAt(\DateTimeImmutable $modified_at): static
    {
        $this->modified_at = $modified_at;

        return $this;
    }
}
