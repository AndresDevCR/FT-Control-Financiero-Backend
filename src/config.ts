import { config } from 'dotenv';
import * as path from 'path';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config();

  //Update the Env glob `./modules/**/*.entity.js` to an absolute path in the dist folder.
  process.env.TYPEORM_ENTITIES = path.resolve(
    __dirname,
    `${process.env.TYPEORM_ENTITIES}`,
  );
}
