import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: '+99890 123 45 67',
    description: 'Uzbekistan phone number (supports multiple formats)',
  })
  @Transform(({ value }) => {
    if (!value) return value;
    const digits = value.replace(/\D/g, '');

    let normalized = digits;
    if (normalized.startsWith('998')) {
      normalized = '+'.concat(normalized);
    } else if (normalized.startsWith('8')) {
      normalized = '+998'.concat(normalized.slice(1));
    } else if (normalized.length === 9) {
      normalized = '+998'.concat(normalized);
    } else if (!normalized.startsWith('+998')) {
      normalized = '+998'.concat(normalized);
    }

    return normalized;
  })
  @Matches(
    /^(\+?998|998|8|0)?[\s\-]?\(?([0-9]{2})\)?[\s\-]?([0-9]{3})[\s\-]?([0-9]{2})[\s\-]?([0-9]{2})$/,
    {
      message:
        'Phone number must be a valid Uzbekistan number (e.g. +998901234567, 998901234567, 90 123 45 67)',
    },
  )
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
    description: 'Password for user',
    example: 'Eshmat123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
