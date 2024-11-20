import {
    Controller,
    Post,
    Body,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('sign-up')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('sign-in')
    signIn(@Body() data: AuthDto) {
        return this.authService.signIn(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['sub']);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        console.log(req.user);
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        console.log(userId, refreshToken);
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
