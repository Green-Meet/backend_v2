import { IsNotEmpty, Matches } from 'class-validator';

export class CreateActionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  beginDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @Matches(/^([0-9]{2})\:([0-9]{2})$/)
  beginTime: string;

  @IsNotEmpty()
  @Matches(/^([0-9]{2})\:([0-9]{2})$/)
  endTime: string;

  @IsNotEmpty()
  city: string;
}
