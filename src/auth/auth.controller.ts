import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'login' })
  @Post('/login')
  async login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.validateUserByPassword(authCredentialsDto);
  }

  @ApiOperation({ summary: 'register' })
  @Post('/register')
  async register(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    const user = await this.authService.createUser(authCredentialsDto);
    return await this.authService.validateUserByPassword(authCredentialsDto);
  }

}
