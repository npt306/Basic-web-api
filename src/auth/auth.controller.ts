import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
