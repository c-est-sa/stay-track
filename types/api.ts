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

// USER /////////////////////////////////////

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  roleId: number;
}