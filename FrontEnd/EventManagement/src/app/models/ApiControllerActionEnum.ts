export enum ApiControllerActionEnum {
  AuthLogin = 'auth/login',
  AuthSignUp = 'auth/signup',
  UserById = 'auth/:id',
  Event = 'event',
  EventById = 'event/:id',
  EventParticipate = 'event/:id/participant',
  EventParticipateUserId = 'event/:id/participant/:userId',
  EventGetEventTypes = 'location/eventTypes',
  Location = 'location',
  Attachment='attachment'
}
