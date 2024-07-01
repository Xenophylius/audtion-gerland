import { Item } from "./item";

export class Appareil implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public nom?: string,
    public marque?: string,
    public prix?: number
  ) {
    this["@id"] = _id;
  }
}
