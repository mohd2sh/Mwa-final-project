import { IUser } from "./IUser";
import { ILocation } from "./ILocation";

export interface IEvent {
  _id: string,
  name: string,
  eventType: string,
  managedBy: string,
  participants: Array<IUser>,
  start: Date,
  location: ILocation
}
