import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllowUnauthorizedRequest } from 'src/common/guard/allow-unauthorized-request';
import { ApiHeader } from '@nestjs/swagger';



@Controller('users')
@ApiHeader({
  name: 'uid',
  description: 'Custom header',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @AllowUnauthorizedRequest()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
    
  }

  @Get('/duplicate/:email')
  @AllowUnauthorizedRequest()
  async DuplicationCheck(@Param('email') email: string) {
    if(await this.usersService.findByEmail(email)){
      return "Available";
    }
    else{
      return "Not Available";
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
