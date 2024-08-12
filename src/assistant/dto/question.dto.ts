import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty({ message: 'threadId es requerido' })
  @IsString({ message: 'threadId debe ser un string' })
  threadId: string;

  @IsNotEmpty({ message: 'question es requerido' })
  @IsString({ message: 'question debe ser un string' })
  @Transform(({ value }) => value.trim())
  question: string;
}
