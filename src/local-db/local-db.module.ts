import { Global, Module } from '@nestjs/common';

import { JobDbService } from './job-db.service';

@Global()
@Module({
    providers: [JobDbService],
    exports: [JobDbService],
})
export class LocalDbModule {}
