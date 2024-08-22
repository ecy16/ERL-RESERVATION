import { PartialType } from '@nestjs/mapped-types';
import {SignInDto } from '../../dto/signIn.dto';

export class UpdateLoginDto extends PartialType(SignInDto) {}
