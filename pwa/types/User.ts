import { Item } from "./item";

export class User implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public email?: string,
    public roles?: any,
    public password?: string,
    public firstname?: string,
    public lastname?: string,
    public userIdentifier?: string
  ) {
    this["@id"] = _id;
  }
}
