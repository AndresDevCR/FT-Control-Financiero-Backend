import { Injectable, Req } from '@nestjs/common';
import { CreateNoteDto } from './create-note.dto';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/administration/users/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: User, createNoteDto: CreateNoteDto) {
    const note = new Note();
    note.comment = createNoteDto.comment;
    note.user_id = user.id;
    return this.noteRepository.save(note);
  }
  findAll() {
    return this.noteRepository.find();
  }
  findOne(id: number) {
    return this.noteRepository.findOne({ where: { id } });
  }

  update(id: number, updateNoteDto: CreateNoteDto) {
    return this.noteRepository.update(id, updateNoteDto);
  }

  remove(id: number) {
    return this.noteRepository.delete(id);
  }
}
