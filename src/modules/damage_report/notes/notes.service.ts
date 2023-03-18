import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './create-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}
  create(createNoteDto: CreateNoteDto) {
    return this.noteRepository.save(createNoteDto);
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
