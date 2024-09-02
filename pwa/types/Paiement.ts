import { Item } from "./item";

export class Paiement implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public RAC?: number,
    public RO?: number,
    public RC?: number,
    public credit?: number,
    public orders?: string,
    public rAC?: number,
    public rO?: number,
    public rC?: number
  ) {
    this["@id"] = _id;
  }
}
