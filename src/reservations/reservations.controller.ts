import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorators/current.user.decorator';
import { TID } from '../hotel-room/interfaces/hotel.room.interfaces';
import { User } from '../users/schemas/user.schemas';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationsService } from './reservations.service';
import { Role } from '../users/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @UseGuards(new RolesGuard([Role.Client]))
  @UseGuards(JwtAuthGuard)
  @Post('/api/client/reservations')
  async addReservation(
    @Body() data: ReservationDto,
    @CurrentUser() user: User & { _id: TID },
  ) {
    try {
      return await this.reservationsService.addReservation(data, user._id);
    } catch (error) {
      return error;
    }
  }
  @UseGuards(new RolesGuard([Role.Client]))
  @UseGuards(JwtAuthGuard)
  @Get('/api/client/reservations')
  async getReservations(@CurrentUser() user: User & { _id: TID }) {
    try {
      return await this.reservationsService.getReservations(user._id);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(new RolesGuard([Role.Client]))
  @UseGuards(JwtAuthGuard)
  @Delete('/api/client/reservations/:id')
  async removeReservation(
    @Param() param: { id: string },
    @CurrentUser() user: User & { _id: TID },
  ) {
    try {
      return await this.reservationsService.removeReservation(param.id, user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(new RolesGuard([Role.Manager]))
  @UseGuards(JwtAuthGuard)
  @Delete('/api/manager/reservations/:id')
  async removeManagerReservation(@Param() param: { id: string }) {
    try {
      return await this.reservationsService.removeManagerReservation(param.id);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(new RolesGuard([Role.Manager]))
  @UseGuards(JwtAuthGuard)
  @Get('/api/manager/reservations/:userId')
  async getUserReservations(@Param() param: { userId: string }) {
    try {
      return await this.reservationsService.getUserReservations(param.userId);
    } catch (error) {
      return error;
    }
  }
}
