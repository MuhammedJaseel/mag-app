import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export enum EventType {
  OPENED = 'opened',
  CLICKED_MORE = 'clicked_more',
  LIKED = 'liked',
}

export class CampaignEventDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(EventType, {
    message: 'event_type must be one of opened, clicked_more, liked',
  })
  @IsNotEmpty()
  event_type: EventType;

  @IsString()
  @IsNotEmpty()
  campain: string;
}
