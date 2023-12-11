import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: number,
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
  ) {
    return this.todoService.create(createTodoDto, +userId);
  }

  @Get('findAllNotCompleted/:userId')
  findAllToDoByUserNotCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllToDoByUserNotCompleted(+userId);
  }
  @Get('findAllCompleted/:userId')
  findAllToDoByUserCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllToDoByUserCompleted(+userId);
  }

  @Patch(':todoId')
  update(@Param('todoId') todoId: number) {
    return this.todoService.update(+todoId);
  }

  @Delete(':todoId')
  remove(@Param('todoId') todoId: number) {
    return this.todoService.remove(+todoId);
  }
}
