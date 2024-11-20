import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    hashData(data: string) {
        return argon2.hash(data);
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username,
            },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '5m',
                }),
            this.jwtService.signAsync({
                sub: userId,
                username,
            },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                })
        ])

        return { accessToken, refreshToken };
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userService.update(userId, { refreshToken: hashedRefreshToken });
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const userExists = await this.userService.findByUsername(createUserDto.username);
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.userService.create({
            ...createUserDto,
            password: hash,
        });

        const tokens = await this.getTokens(newUser._id.toString(), newUser.username);
        await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken);
        return tokens;
    }


    async signIn(data: AuthDto): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.userService.findByUsername(data.username);
        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Password is incorrect');
        }
        const tokens = await this.getTokens(user._id.toString(), user.username);
        await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);
        return tokens;
    }

    async logout(userId: string) {
        return this.userService.update(userId, { refreshToken: null });
      }

    async refreshTokens(userId: string, refreshToken: string){
        const user = await this.userService.findOneById(userId);
        if(!user || !user.refreshToken){
            throw new ForbiddenException('Access denied');
        }
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if(!refreshTokenMatches){
            throw new ForbiddenException('Refresh denied');
        }
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}
