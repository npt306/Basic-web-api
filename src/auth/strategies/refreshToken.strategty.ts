import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        })
    }
    validate(req: Request, payload: any) {
        const refreshToken = req.get('Authorization').replace('Bearer ', '').trim();
        return { refreshToken, ...payload };
    }
}