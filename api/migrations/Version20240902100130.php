<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240902100130 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE order_device DROP CONSTRAINT fk_caa0a65b8d9f6d38');
        $this->addSql('ALTER TABLE order_device DROP CONSTRAINT fk_caa0a65b94a4c7d4');
        $this->addSql('DROP TABLE order_device');
        $this->addSql('ALTER TABLE "order" ADD id_customer_id INT NOT NULL');
        $this->addSql('ALTER TABLE "order" DROP name_accessorie');
        $this->addSql('ALTER TABLE "order" DROP price_accessorie');
        $this->addSql('ALTER TABLE "order" DROP mutual');
        $this->addSql('ALTER TABLE "order" DROP remise');
        $this->addSql('ALTER TABLE "order" DROP price_ttc');
        $this->addSql('ALTER TABLE "order" DROP status');
        $this->addSql('ALTER TABLE "order" DROP paiement_type');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F52993988B870E04 FOREIGN KEY (id_customer_id) REFERENCES customer (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F52993988B870E04 ON "order" (id_customer_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE order_device (order_id INT NOT NULL, device_id INT NOT NULL, PRIMARY KEY(order_id, device_id))');
        $this->addSql('CREATE INDEX idx_caa0a65b94a4c7d4 ON order_device (device_id)');
        $this->addSql('CREATE INDEX idx_caa0a65b8d9f6d38 ON order_device (order_id)');
        $this->addSql('ALTER TABLE order_device ADD CONSTRAINT fk_caa0a65b8d9f6d38 FOREIGN KEY (order_id) REFERENCES "order" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE order_device ADD CONSTRAINT fk_caa0a65b94a4c7d4 FOREIGN KEY (device_id) REFERENCES device (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F52993988B870E04');
        $this->addSql('DROP INDEX IDX_F52993988B870E04');
        $this->addSql('ALTER TABLE "order" ADD name_accessorie VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "order" ADD price_accessorie DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE "order" ADD mutual VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "order" ADD remise DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE "order" ADD price_ttc DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD paiement_type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "order" DROP id_customer_id');
    }
}
