import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import LokiTransport = require('winston-loki');

@Injectable()
export class LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
            ), 
            transports: [
                new winston.transports.Console(),
                new winston.transports.DailyRotateFile({
                    filename: 'logs/basic-web-api-%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                }), 
                new winston.transports.File({ 
                    filename: 'logs/error.log', 
                    level: 'error',                    
                }),
                // new LokiTransport({
                //     host: 'http://<LOKI_SERVER_URL>:3100', 
                //     basicAuth: 'username:password',          
                //     labels: { service: 'nestjs-app' },       
                //     json: true,
                //     replaceTimestamp: true,
                //   }),
            ]
        })
    }
    log(message: string) {
        this.logger.info(message);
    }
    error(message: string) {
        this.logger.error(message);
    }
    warn(message: string) {
        this.logger.warn(message);
    }
    debug(message: string) {
        this.logger.debug(message);
    }
}