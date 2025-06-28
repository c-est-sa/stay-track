// RESEVATION /////////////////////////////////////

export interface CreateReservationDataType {
  reservationId: string;
  reservationName: string;
  checkInDate: Date;
  checkOutDate: Date;
  reservedRoomName: string[];
  numberOfAdults: number;
  numberOfKids: number;
  paymentCompletionStatus: boolean;
  bookingSiteId: number;
}

export interface UpdateReservationDataType
  extends Partial<CreateReservationDataType> {
  reservationInfo?: string;
}

export interface CreateReservationByRoomDataType {
  reservationByRoomId: string;
  roomNumber: string;
  reservationId: string;
  guestName: string;
  numberOfAdults: number;
  numberOfKids: number;
}

export interface UpdateReservationByRoomDataType
  extends Partial<CreateReservationByRoomDataType> {
  guestStatus?: number;
  restaurantTimeId?: number;
  restaurantTableId?: number;
}

export interface CreateGuestDetailsDataType
  extends CreateReservationDataType,
    CreateReservationByRoomDataType {}

export interface UpdateGuestDetailsDataType
  extends UpdateReservationDataType,
    UpdateReservationByRoomDataType {
  reservationsByRoom?: CreateReservationByRoomDataType[];
}

// ROOM /////////////////////////////////////

export interface CreateRoomData {
  roomNumber: string;
  roomName: string;
  roomImageUrl: string[];
  maxNumberOfPeople: number;
  facilities: string[];
}

export interface UpdateRoomData extends Partial<CreateRoomData> {
  roomStatusId?: number;
  roomInfo?: string;
}

// ROOM STATUS /////////////////////////////////////

export interface CreateRoomStatusData {
  roomStatus: string;
}

// USER and AUTH /////////////////////////////////////

export interface CreateUserDataType {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

export interface SignInDataType {
  email: string;
  password: string;
}

export interface UpdateUserAuthDataType {
  email?: string;
  app_metadata?: {
    isAdmin?: boolean;
  };
  password?: string;
}

export interface UpdateUserDataType extends Partial<UpdateUserAuthDataType> {
  username?: string;
  roleId?: number;
}
