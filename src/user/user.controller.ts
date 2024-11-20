import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Patch,
    UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.userService.findOneById(id);
    }

    @Patch(':username')
    findByUsername(@Param('username') username: string) {
        return this.userService.findByUsername(username);
    }

    @UseGuards(AccessTokenGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

}
