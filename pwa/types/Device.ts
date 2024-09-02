import { Item } from "./item";

export class Device implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public company?: string,
    public tva?: number,
    public price_ttc?: number,
    public orders?: string[],
    public priceTtc?: number
  ) {
    this["@id"] = _id;
  }
}
