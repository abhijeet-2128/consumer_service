import { Controller, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  onModuleInit() {
    // This method will be called once the module has been initialized.
    this.startKafkaConsumer();
  }

  private async startKafkaConsumer() {
    await this.kafkaService.fun();
    // Add any additional logic if needed
  }
}
