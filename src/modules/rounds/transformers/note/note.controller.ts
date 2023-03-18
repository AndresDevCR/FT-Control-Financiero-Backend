import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './create-note.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '@/modules/administration/users/user.entity';

@ApiTags('Transformer')
@Controller('/api/v1/transformers/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Req() { user }: Request, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(<User>user, createNoteDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 200, description: 'Ok' })
  update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Ok' })
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
