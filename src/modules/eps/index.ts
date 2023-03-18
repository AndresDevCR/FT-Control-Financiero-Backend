import { BreakerModule } from './breaker/breaker.module';
import { DisconnectorsModule } from './disconnector/disconnectors.module';
import { PhaseModule } from './phase/phase.module';
import { SubstationsModule } from './substations/substations.module';
import { ThreadModule } from './thread/thread.module';
import { TransformerModule } from './transformer/transformer.module';
import { VoltageModule } from './voltage/voltage.module';
import { ApplicationModule } from '../administration/application/application.module';
import { PanelModule } from './panel/panel.module';
import { CommentModule } from './comment/comment.module';
import { ImpactModule } from './impact/impact.module';

export const EpsModules = [
  ThreadModule,
  VoltageModule,
  PhaseModule,
  DisconnectorsModule,
  TransformerModule,
  SubstationsModule,
  BreakerModule,
  ApplicationModule,
  PanelModule,
  CommentModule,
  ImpactModule,
];
