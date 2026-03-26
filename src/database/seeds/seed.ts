import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { LessonsService } from '../../lessons/lessons.service';
import { PartType, Difficulty } from '../enums';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const lessonsService = app.get(LessonsService);

  const sampleLessons = [
    {
      title: 'Sample Part 3 Lesson: Conversation',
      description: 'A sample conversation about office supplies.',
      part_type: PartType.PART3,
      audio_url: 'https://example.com/audio/part3_sample.mp3',
      duration_seconds: 45,
      difficulty: Difficulty.EASY,
      sentences: [
        {
          order_index: 1,
          content: "Did you order the new printer cartridges yet?",
          start_time: 0.5,
          end_time: 3.2,
          keywords: ["order", "printer", "cartridges"],
        },
        {
          order_index: 2,
          content: "Yes, I placed the order yesterday afternoon.",
          start_time: 3.5,
          end_time: 6.0,
          keywords: ["placed", "yesterday", "afternoon"],
        }
      ]
    },
    {
      title: 'Sample Part 4 Lesson: Announcement',
      description: 'A sample public announcement at a train station.',
      part_type: PartType.PART4,
      audio_url: 'https://example.com/audio/part4_sample.mp3',
      duration_seconds: 60,
      difficulty: Difficulty.MEDIUM,
      sentences: [
        {
          order_index: 1,
          content: "Attention all passengers waiting for the express train to Kyoto.",
          start_time: 1.0,
          end_time: 5.5,
          keywords: ["attention", "passengers", "express", "train"],
        },
        {
          order_index: 2,
          content: "This train has been delayed due to heavy snowfall.",
          start_time: 6.0,
          end_time: 10.0,
          keywords: ["delayed", "heavy", "snowfall"],
        }
      ]
    }
  ];

  for (const data of sampleLessons) {
    try {
      await lessonsService.create(data);
      console.log(`Created lesson: ${data.title}`);
    } catch (error) {
      console.error(`Failed to create lesson: ${data.title}`, error);
    }
  }

  console.log('Seeding completed');
  await app.close();
}

bootstrap();
