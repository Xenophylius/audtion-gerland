<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ApiResource]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $birth = null;

    #[ORM\Column(length: 255)]
    private ?string $sex = null;

    #[ORM\Column(length: 255)]
    private ?string $city = null;

    #[ORM\ManyToOne(inversedBy: 'customers')]
    private ?User $id_user = null;

    #[ORM\ManyToOne(inversedBy: 'customers')]
    private ?Center $id_center = null;

    /**
     * @var Collection<int, Order>
     */
    #[ORM\OneToMany(mappedBy: 'id_customer', targetEntity: Order::class)]
    private Collection $id_name_audio;

    /**
     * @var Collection<int, Order>
     */
    #[ORM\OneToMany(mappedBy: 'id_customer', targetEntity: Order::class)]
    private Collection $orders;

    public function __construct()
    {
        $this->id_name_audio = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBirth(): ?\DateTimeInterface
    {
        return $this->birth;
    }

    public function setBirth(\DateTimeInterface $birth): static
    {
        $this->birth = $birth;

        return $this;
    }

    public function getSex(): ?string
    {
        return $this->sex;
    }

    public function setSex(string $sex): static
    {
        $this->sex = $sex;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getIdUser(): ?User
    {
        return $this->id_user;
    }

    public function setIdUser(?User $id_user): static
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getIdCenter(): ?Center
    {
        return $this->id_center;
    }

    public function setIdCenter(?Center $id_center): static
    {
        $this->id_center = $id_center;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getIdNameAudio(): Collection
    {
        return $this->id_name_audio;
    }

    public function addIdNameAudio(Order $idNameAudio): static
    {
        if (!$this->id_name_audio->contains($idNameAudio)) {
            $this->id_name_audio->add($idNameAudio);
            $idNameAudio->setIdCustomer($this);
        }

        return $this;
    }

    public function removeIdNameAudio(Order $idNameAudio): static
    {
        if ($this->id_name_audio->removeElement($idNameAudio)) {
            // set the owning side to null (unless already changed)
            if ($idNameAudio->getIdCustomer() === $this) {
                $idNameAudio->setIdCustomer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setIdCustomer($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getIdCustomer() === $this) {
                $order->setIdCustomer(null);
            }
        }

        return $this;
    }
}
