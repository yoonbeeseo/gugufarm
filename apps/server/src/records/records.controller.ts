import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Dan, PersonalRecordWithoutIds } from '@gugufarm/types';

@Controller('records')
export class RecordsController {
  constructor(private recordService: RecordsService) {}

  @Get(':id')
  async getMyRecord(
    @Param('id') id: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('dan') dan: Dan,
  ) {
    return await this.recordService.getMyRecords(id, page, dan);
  }

  @Get()
  async getRecord(
    @Query('page', ParseIntPipe) page: number,
    @Query('dan') dan: Dan,
  ) {
    return await this.recordService.findAll(page, dan);
  }

  @Post(':id')
  async recordOne(
    @Param('id') id: string,
    @Body() record: PersonalRecordWithoutIds,
  ) {
    return await this.recordService.recordOne(id, record);
  }

  @Post()
  async patchRecords(@Query('id') id: string) {
    return await this.recordService.testPatch(
      id,
      Array.from({ length: 20 }, (_, i): PersonalRecordWithoutIds => {
        const getRandomNumber = (max: number) => {
          let n = 1;
          do {
            n = Math.ceil(Math.random() * (max - 1));
          } while (n <= 0 || n > max);
          return n;
        };
        return {
          createdAt: new Date().getTime() + i * 200,
          score: getRandomNumber(10) * (i + 1) * 1000,
          targetDan: `${getRandomNumber(8) + 1}단` as Dan,
          timeSpent: getRandomNumber(10) * 1000 * 60,
        };
      }),
    );
  }
}
