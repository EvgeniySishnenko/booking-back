import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ValidationPipeCustom } from '../pipes/validation.pipe.custom';
import { Role } from '../users/enums/roles.enum';
import { AddHotelParamsDTO } from './dto/add.hotel.params.dto';
import { UpdateHotelParamsDTO } from './dto/update.hotel.params.dto';
import { HotelService } from './hotel.service';
import { IFindSearchParams } from './interfaces/find-search.params.interface';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @UseGuards(new RolesGuard([Role.Admin]))
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipeCustom)
  @Post('/api/admin/hotels')
  async addHotel(@Body() addHotelDTO: AddHotelParamsDTO) {
    try {
      const hotel = await this.hotelService.addHotel(addHotelDTO);
      return {
        id: hotel._id,
        title: hotel.title,
        description: hotel.description,
      };
    } catch (error) {
      return error;
    }
  }

  @UseGuards(new RolesGuard([Role.Admin]))
  @UseGuards(JwtAuthGuard)
  @Get('/api/admin/hotels')
  async getHotels(@Query() params: Omit<IFindSearchParams, 'hotel'>) {
    try {
      const hotels = await this.hotelService.getHotels(params);
      return hotels;
    } catch (error) {
      return error;
    }
  }

  @UseGuards(new RolesGuard([Role.Admin]))
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipeCustom)
  @Put('/api/admin/hotels/:id')
  async updateHotel(
    @Body() updateHotelParamsDTO: UpdateHotelParamsDTO,
    @Param('id') id: string,
  ) {
    try {
      const hotel = await this.hotelService.updateHotel(
        updateHotelParamsDTO,
        id,
      );

      return {
        id: hotel._id,
        title: hotel.title,
        description: hotel.description,
      };
    } catch (error) {
      return error;
    }
  }
}
