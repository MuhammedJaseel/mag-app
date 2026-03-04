import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() credentials: LoginDto) {
    const result = await this.authService.login(
      credentials.tenantId,
      credentials.email,
      credentials.password,
    );
    return { message: result };
  }
}
