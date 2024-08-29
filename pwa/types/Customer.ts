import { Item } from "./item";

export class Customer implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public firstname?: string,
    public lastname?: string,
    public birth?: Date,
    public sex?: string,
    public city?: string,
    public id_user?: string,
    public id_center?: string,
    public idUser?: string,
    public idCenter?: string
  ) {
    this["@id"] = _id;
  }
}
