import { Item } from "./item";

export class Insurance implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public price_ttc?: number,
    public tva?: number,
    public orders?: string[],
    public priceTtc?: number
  ) {
    this["@id"] = _id;
  }
}
