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
