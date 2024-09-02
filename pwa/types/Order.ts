import { Item } from "./item";

export class Order implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public id_customer?: any,
    public id_name_audio?: string,
    public id_insurance?: string,
    public id_device?: string[],
    public name_accessorie?: string,
    public price_accessorie?: number,
    public mutual?: string,
    public remise?: number,
    public price_ttc?: number,
    public id_paiement?: string,
    public status?: string,
    public paiement_type?: string,
    public id_center_pec?: string,
    public created_at?: Date,
    public modified_at?: Date,
    public idCustomer?: any,
    public idNameAudio?: string,
    public idInsurance?: string,
    public idDevice?: string[],
    public nameAccessorie?: string,
    public priceAccessorie?: number,
    public priceTtc?: number,
    public idPaiement?: string,
    public paiementType?: string,
    public idCenterPec?: string,
    public createdAt?: Date,
    public modifiedAt?: Date
  ) {
    this["@id"] = _id;
  }
}
