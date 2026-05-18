import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class LiabilityController {
  @MessagePattern({ cmd: 'liability.ping' })
  ping(): string {
    return '[Liability] I am alive.';
  }
}
