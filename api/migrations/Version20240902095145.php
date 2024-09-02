<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240902095145 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f52993988b870e04');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f5299398a8c8076c');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f5299398f22749a3');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f5299398325e898f');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f529939888ebd8d8');
        $this->addSql('DROP INDEX idx_f529939888ebd8d8');
        $this->addSql('DROP INDEX uniq_f5299398325e898f');
        $this->addSql('DROP INDEX idx_f5299398f22749a3');
        $this->addSql('DROP INDEX idx_f5299398a8c8076c');
        $this->addSql('DROP INDEX idx_f52993988b870e04');
        $this->addSql('ALTER TABLE "order" DROP id_customer_id');
        $this->addSql('ALTER TABLE "order" DROP id_name_audio_id');
        $this->addSql('ALTER TABLE "order" DROP id_insurance_id');
        $this->addSql('ALTER TABLE "order" DROP id_paiement_id');
        $this->addSql('ALTER TABLE "order" DROP id_center_pec_id');
        $this->addSql('ALTER TABLE "order" DROP created_at');
        $this->addSql('ALTER TABLE "order" DROP modified_at');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "order" ADD id_customer_id INT NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD id_name_audio_id INT NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD id_insurance_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "order" ADD id_paiement_id INT NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD id_center_pec_id INT NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD modified_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('COMMENT ON COLUMN "order".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "order".modified_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f52993988b870e04 FOREIGN KEY (id_customer_id) REFERENCES customer (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f5299398a8c8076c FOREIGN KEY (id_name_audio_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f5299398f22749a3 FOREIGN KEY (id_insurance_id) REFERENCES insurance (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f5299398325e898f FOREIGN KEY (id_paiement_id) REFERENCES paiement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f529939888ebd8d8 FOREIGN KEY (id_center_pec_id) REFERENCES center (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_f529939888ebd8d8 ON "order" (id_center_pec_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_f5299398325e898f ON "order" (id_paiement_id)');
        $this->addSql('CREATE INDEX idx_f5299398f22749a3 ON "order" (id_insurance_id)');
        $this->addSql('CREATE INDEX idx_f5299398a8c8076c ON "order" (id_name_audio_id)');
        $this->addSql('CREATE INDEX idx_f52993988b870e04 ON "order" (id_customer_id)');
    }
}
