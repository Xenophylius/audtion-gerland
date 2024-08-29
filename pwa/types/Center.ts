import { Item } from "./item";

export class Center implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public address?: string,
    public city?: string,
    public postal_code?: number,
    public phone?: string,
    public mail?: string,
    public customers?: string[],
    public postalCode?: number
  ) {
    this["@id"] = _id;
  }
}
