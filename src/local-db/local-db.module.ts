import { Global, Module } from '@nestjs/common';

import { JobDbService } from './job-db.service';

@Module({
    providers: [JobDbService],
    exports: [JobDbService],
})
export class LocalDbModule {}
