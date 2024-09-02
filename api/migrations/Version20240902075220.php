<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240902075220 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE appareil_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE device_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE insurance_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "order_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE paiement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE device (id INT NOT NULL, name VARCHAR(255) NOT NULL, company VARCHAR(255) DEFAULT NULL, tva DOUBLE PRECISION NOT NULL, price_ttc DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE insurance (id INT NOT NULL, name VARCHAR(255) NOT NULL, price_ttc DOUBLE PRECISION NOT NULL, tva DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "order" (id INT NOT NULL, id_customer_id INT NOT NULL, id_name_audio_id INT NOT NULL, id_insurance_id INT DEFAULT NULL, id_paiement_id INT NOT NULL, id_center_pec_id INT NOT NULL, name_accessorie VARCHAR(255) DEFAULT NULL, price_accessorie DOUBLE PRECISION DEFAULT NULL, mutual VARCHAR(255) DEFAULT NULL, remise DOUBLE PRECISION DEFAULT NULL, price_ttc DOUBLE PRECISION NOT NULL, status VARCHAR(255) NOT NULL, paiement_type VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, modified_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F52993988B870E04 ON "order" (id_customer_id)');
        $this->addSql('CREATE INDEX IDX_F5299398A8C8076C ON "order" (id_name_audio_id)');
        $this->addSql('CREATE INDEX IDX_F5299398F22749A3 ON "order" (id_insurance_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F5299398325E898F ON "order" (id_paiement_id)');
        $this->addSql('CREATE INDEX IDX_F529939888EBD8D8 ON "order" (id_center_pec_id)');
        $this->addSql('COMMENT ON COLUMN "order".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "order".modified_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE order_device (order_id INT NOT NULL, device_id INT NOT NULL, PRIMARY KEY(order_id, device_id))');
        $this->addSql('CREATE INDEX IDX_CAA0A65B8D9F6D38 ON order_device (order_id)');
        $this->addSql('CREATE INDEX IDX_CAA0A65B94A4C7D4 ON order_device (device_id)');
        $this->addSql('CREATE TABLE paiement (id INT NOT NULL, rac DOUBLE PRECISION DEFAULT NULL, ro DOUBLE PRECISION DEFAULT NULL, rc DOUBLE PRECISION DEFAULT NULL, credit DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F52993988B870E04 FOREIGN KEY (id_customer_id) REFERENCES customer (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F5299398A8C8076C FOREIGN KEY (id_name_audio_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F5299398F22749A3 FOREIGN KEY (id_insurance_id) REFERENCES insurance (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F5299398325E898F FOREIGN KEY (id_paiement_id) REFERENCES paiement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F529939888EBD8D8 FOREIGN KEY (id_center_pec_id) REFERENCES center (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE order_device ADD CONSTRAINT FK_CAA0A65B8D9F6D38 FOREIGN KEY (order_id) REFERENCES "order" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE order_device ADD CONSTRAINT FK_CAA0A65B94A4C7D4 FOREIGN KEY (device_id) REFERENCES device (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE appareil');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE device_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE insurance_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "order_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE paiement_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE appareil_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE appareil (id INT NOT NULL, nom VARCHAR(255) NOT NULL, marque VARCHAR(255) NOT NULL, prix DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F52993988B870E04');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F5299398A8C8076C');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F5299398F22749A3');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F5299398325E898F');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F529939888EBD8D8');
        $this->addSql('ALTER TABLE order_device DROP CONSTRAINT FK_CAA0A65B8D9F6D38');
        $this->addSql('ALTER TABLE order_device DROP CONSTRAINT FK_CAA0A65B94A4C7D4');
        $this->addSql('DROP TABLE device');
        $this->addSql('DROP TABLE insurance');
        $this->addSql('DROP TABLE "order"');
        $this->addSql('DROP TABLE order_device');
        $this->addSql('DROP TABLE paiement');
    }
}
