import { IAttachment } from "./IAttachment";

export interface ILocation {
  _id: String,
  name: String,
  website:String,
  location: any[],
  supportedEvents: Array<String>,
  image: IAttachment
}
