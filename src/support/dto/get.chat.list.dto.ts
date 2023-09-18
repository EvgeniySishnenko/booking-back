import { TID } from '../../hotel-room/interfaces/hotel.room.interfaces';

export interface GetChatListDto {
  user: TID | null;
  isActive: boolean;
}
