import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CurrentUser } from 'src/auth/decorators/current.user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IFindSearchParams } from 'src/hotel/interfaces/find-search.params.interface';
import { ValidationPipeCustom } from '../pipes/validation.pipe.custom';
import { Role } from 'src/users/enums/roles.enum';
import { User } from 'src/users/schemas/user.schemas';
import { CreateHotelRoomDTo } from './dto/create.hotel.room.dto';
import { UpdateHotelRoomDTO } from './dto/update.hotel.room.dto';
import { CheckAuthGuard } from './guards/check.auth.guard';
import { HotelRoomService } from './hotel-room.service';
import { TID } from './interfaces/hotel.room.interfaces';
import { saveImagesToStorage } from './utils/save.images..to.storage';

@Controller('hotel-room')
export class HotelRoomController {
  constructor(private hotelRoomService: HotelRoomService) {}

  @UseGuards(new RolesGuard([Role.Admin]))
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipeCustom)
  @Post('/api/admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('file', 10, saveImagesToStorage))
  async create(@UploadedFiles() file, @Body() data: CreateHotelRoomDTo) {
    try {
      return await this.hotelRoomService.create(data, file);
    } catch (error) {
      return error;
    }
  }

  @Get('/api/common/hotel-rooms/:id')
  async getHotelRoom(@Param('id') id: string) {
    try {
      return await this.hotelRoomService.getHotelRoom(id);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(CheckAuthGuard)
  @Get('/api/common/hotel-rooms')
  async getHotelRooms(
    @CurrentUser() user: User & { _id: TID },
    @Query() params: IFindSearchParams,
  ) {
    return await this.hotelRoomService.getHotelRooms(params, user);
  }

  @UseGuards(new RolesGuard([Role.Admin]))
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipeCustom)
  @Put('/api/admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('file', 10, saveImagesToStorage))
  async update(
    @UploadedFiles() file,
    @Body() data: UpdateHotelRoomDTO,
    @Param('id') id: string,
  ) {
    try {
      return await this.hotelRoomService.update(data, file, id);
    } catch (error) {
      return error;
    }
  }
}
