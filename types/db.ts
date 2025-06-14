export interface UserType {
  userId: string;
  username: string;
  email: string;
  passwordToken: string;
  roleId: number;
  role: UserRoleType;
}

export interface UserRoleType {
  roleId: number;
  role: string;
  user: UserType[];
}

export interface ReservationType {
  reservationId: string;
  reservationName: string;
  checkInDate: Date;
  checkOutDate: Date;
  reservedRoomName: string[];
  numberOfAdults: number;
  numberOfKids: number;
  reservationInfo?: string;
  paymentCompletionStatus: boolean;
  reservationsByRoom: ReservationByRoomType[];
  bookingSiteId: number;
  bookingSite: BookingSiteType;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingSiteType {
  bookingSiteId: number;
  bookingSiteName: string;
  reservation: ReservationType[];
}

export interface RoomType {
  roomNumber: string;
  roomName: string;
  roomImageUrl: string[];
  maxNumberOfPeople: number;
  facilities: string[];
  roomStatusId?: number;
  roomStatus?: RoomStatusData;
  roomInfo?: string;
  createdAt: Date;
  updatedAt: Date;
  reservationByRoom: ReservationByRoomType[];
}

export interface RoomStatusData {
  roomStatusId: number;
  roomStatus: string;
  room: RoomType[];
}

export interface ReservationByRoomType {
  reservationByRoomId: string;
  roomNumber: string;
  room: RoomType;
  reservationId: string;
  reservation: ReservationType;
  guestName: string;
  numberOfAdults: number;
  numberOfKids: number;
  guestStatusId?: number;
  guestStatus?: GuestStatusType;
  restaurantTimeId?: number;
  restaurantTime?: RestaurantTimeType;
  restaurantTableId?: number;
  restaurantTable?: RestaurantTableType;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestStatusType {
  guestStatusId: number;
  guestStatus: string;
  reservationByRoom: ReservationByRoomType[];
}

export interface RestaurantTimeType {
  restaurantTimeId: number;
  restaurantTime: string;
  reservationByRoom: ReservationByRoomType[];
}

export interface RestaurantTableType {
  restaurantTableId: number;
  restaurantTableName: string;
  reservationByRoom: ReservationByRoomType[];
}
