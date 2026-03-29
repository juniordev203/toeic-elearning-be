import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { LessonsService } from '../../lessons/lessons.service';
import { PartType, Difficulty } from '../enums';
import { Lesson } from '../entities/lesson.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const lessonsService = app.get(LessonsService);
  const lessonRepo = app.get<Repository<Lesson>>(getRepositoryToken(Lesson));

  console.log('Clearing existing lessons...');
  await lessonRepo.createQueryBuilder().delete().execute();

  const AUDIO_PLACEHOLDER = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const sampleLessons = [
    {
      title: 'Part 3: Requesting Time Off',
      description: 'A conversation between an employee and a manager about taking paid time off for a family event.',
      part_type: PartType.PART3,
      audio_url: AUDIO_PLACEHOLDER,
      duration_seconds: 40,
      difficulty: Difficulty.EASY,
      sentences: [
        {
          order_index: 1,
          content: "Hi Mr. Thompson, do you have a minute to discuss my schedule for next month?",
          start_time: 0.0,
          end_time: 5.0,
          keywords: ["minute", "discuss", "schedule", "month"],
        },
        {
          order_index: 2,
          content: "Sure, Sarah. Come on in. What do you need?",
          start_time: 5.0,
          end_time: 8.5,
          keywords: ["Sure", "Come", "need"],
        },
        {
          order_index: 3,
          content: "I'd like to request a few days off in the second week of October. My sister is getting married.",
          start_time: 8.5,
          end_time: 15.0,
          keywords: ["request", "days", "second", "October", "married"],
        },
        {
          order_index: 4,
          content: "Congratulations to her! We usually need two weeks' notice, but let me check the team calendar.",
          start_time: 15.0,
          end_time: 21.0,
          keywords: ["Congratulations", "usually", "notice", "calendar"],
        },
        {
          order_index: 5,
          content: "It looks like we have enough coverage on those dates. Please submit the formal request through the HR portal.",
          start_time: 21.0,
          end_time: 28.5,
          keywords: ["coverage", "dates", "submit", "formal", "portal"],
        },
        {
          order_index: 6,
          content: "Thank you so much. I will fill out the online form right away.",
          start_time: 28.5,
          end_time: 33.0,
          keywords: ["Thank", "online", "form", "away"],
        }
      ]
    },
    {
      title: 'Part 3: Ordering Supplies',
      description: 'Coworkers discuss a broken office printer and placing an order for replacement parts.',
      part_type: PartType.PART3,
      audio_url: AUDIO_PLACEHOLDER,
      duration_seconds: 45,
      difficulty: Difficulty.MEDIUM,
      sentences: [
        {
          order_index: 1,
          content: "Has anyone been able to fix the printer in the accounting department?",
          start_time: 0.0,
          end_time: 4.5,
          keywords: ["fix", "printer", "accounting", "department"],
        },
        {
          order_index: 2,
          content: "No, the technician came this morning and said we need a new paper tray mechanism.",
          start_time: 4.5,
          end_time: 10.0,
          keywords: ["technician", "morning", "paper", "tray", "mechanism"],
        },
        {
          order_index: 3,
          content: "That's unfortunate. We have a lot of financial reports to print by Friday.",
          start_time: 10.0,
          end_time: 15.5,
          keywords: ["unfortunate", "financial", "reports", "print", "Friday"],
        },
        {
          order_index: 4,
          content: "I know. I've already submitted a purchase order to the supplier.",
          start_time: 15.5,
          end_time: 20.0,
          keywords: ["submitted", "purchase", "order", "supplier"],
        },
        {
          order_index: 5,
          content: "They promised expedited shipping, so the part should arrive tomorrow afternoon.",
          start_time: 20.0,
          end_time: 25.0,
          keywords: ["promised", "expedited", "shipping", "arrive", "tomorrow"],
        },
        {
          order_index: 6,
          content: "In the meantime, we can use the smaller printer in the sales office.",
          start_time: 25.0,
          end_time: 30.5,
          keywords: ["meantime", "smaller", "printer", "sales", "office"],
        }
      ]
    },
    {
      title: 'Part 3: Conference Schedule Change',
      description: 'Business trip planning and a sudden change in an industry conference itinerary.',
      part_type: PartType.PART3,
      audio_url: AUDIO_PLACEHOLDER,
      duration_seconds: 55,
      difficulty: Difficulty.HARD,
      sentences: [
        {
          order_index: 1,
          content: "Did you see the updated itinerary for the software engineering conference in Berlin?",
          start_time: 0.0,
          end_time: 5.5,
          keywords: ["updated", "itinerary", "software", "engineering", "conference"],
        },
        {
          order_index: 2,
          content: "Yes, I just checked my email. It seems the keynote speech has been moved to Thursday morning.",
          start_time: 5.5,
          end_time: 11.5,
          keywords: ["email", "keynote", "speech", "moved", "Thursday"],
        },
        {
          order_index: 3,
          content: "Exactly. The problem is our flight doesn't arrive until Thursday afternoon.",
          start_time: 11.5,
          end_time: 16.5,
          keywords: ["problem", "flight", "arrive", "Thursday", "afternoon"],
        },
        {
          order_index: 4,
          content: "Oh, I hadn't realized that. The keynote address by Dr. Peterson is the main reason we're attending.",
          start_time: 16.5,
          end_time: 23.0,
          keywords: ["realized", "keynote", "address", "main", "reason", "attending"],
        },
        {
          order_index: 5,
          content: "Let me call the travel agency right now to see if we can switch our tickets to a Wednesday evening departure.",
          start_time: 23.0,
          end_time: 30.0,
          keywords: ["travel", "agency", "switch", "tickets", "Wednesday", "departure"],
        },
        {
          order_index: 6,
          content: "Good idea. While you do that, I'll contact our hotel to add an extra night to our reservation.",
          start_time: 30.0,
          end_time: 36.5,
          keywords: ["idea", "contact", "hotel", "extra", "night", "reservation"],
        }
      ]
    },
    {
      title: 'Part 4: Store Closing Announcement',
      description: 'A brief public announcement broadcasted over the intercom in a retail store.',
      part_type: PartType.PART4,
      audio_url: AUDIO_PLACEHOLDER,
      duration_seconds: 40,
      difficulty: Difficulty.EASY,
      sentences: [
        {
          order_index: 1,
          content: "Attention all shoppers. The time is now nine forty-five PM.",
          start_time: 0.0,
          end_time: 4.5,
          keywords: ["Attention", "shoppers", "time", "nine", "forty-five"],
        },
        {
          order_index: 2,
          content: "Our store will be closing in exactly fifteen minutes.",
          start_time: 4.5,
          end_time: 8.5,
          keywords: ["store", "closing", "exactly", "fifteen", "minutes"],
        },
        {
          order_index: 3,
          content: "Please bring your final selections to the checkout counters located at the front entrance.",
          start_time: 8.5,
          end_time: 14.5,
          keywords: ["bring", "selections", "checkout", "counters", "entrance"],
        },
        {
          order_index: 4,
          content: "Don't forget to use your membership cards to receive your loyalty discounts today.",
          start_time: 14.5,
          end_time: 20.0,
          keywords: ["forget", "membership", "cards", "receive", "loyalty", "discounts"],
        },
        {
          order_index: 5,
          content: "We will reopen tomorrow morning at eight AM for our special holiday sale.",
          start_time: 20.0,
          end_time: 26.0,
          keywords: ["reopen", "tomorrow", "eight", "special", "holiday", "sale"],
        },
        {
          order_index: 6,
          content: "Thank you for shopping with us and have a wonderful evening.",
          start_time: 26.0,
          end_time: 31.0,
          keywords: ["shopping", "wonderful", "evening"],
        }
      ]
    },
    {
      title: 'Part 4: Voicemail Message',
      description: 'A recorded message left by a client expressing concerns over a recent business proposal.',
      part_type: PartType.PART4,
      audio_url: AUDIO_PLACEHOLDER,
      duration_seconds: 50,
      difficulty: Difficulty.MEDIUM,
      sentences: [
        {
          order_index: 1,
          content: "Hello, this is a message for David Lee from the marketing department.",
          start_time: 0.0,
          end_time: 5.0,
          keywords: ["message", "David", "marketing", "department"],
        },
        {
          order_index: 2,
          content: "My name is Amanda Ruiz, calling from Summit Manufacturing regarding the recent advertising proposal.",
          start_time: 5.0,
          end_time: 11.5,
          keywords: ["Amanda", "Summit", "Manufacturing", "regarding", "advertising", "proposal"],
        },
        {
          order_index: 3,
          content: "I've reviewed the preliminary designs for our upcoming billboard campaign.",
          start_time: 11.5,
          end_time: 16.5,
          keywords: ["reviewed", "preliminary", "designs", "upcoming", "billboard", "campaign"],
        },
        {
          order_index: 4,
          content: "While we love the visual concepts, we noticed that the budget estimate is significantly higher than we discussed.",
          start_time: 16.5,
          end_time: 23.5,
          keywords: ["visual", "concepts", "noticed", "budget", "estimate", "significantly", "higher"],
        },
        {
          order_index: 5,
          content: "Before we sign the final contract, we would like to schedule a quick video call with your team to review the itemized costs.",
          start_time: 23.5,
          end_time: 31.5,
          keywords: ["sign", "final", "contract", "schedule", "video", "review", "itemized", "costs"],
        },
        {
          order_index: 6,
          content: "Please give me a call back at your earliest convenience to set up a meeting time.",
          start_time: 31.5,
          end_time: 37.5,
          keywords: ["call", "earliest", "convenience", "meeting", "time"],
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

  console.log('Seeding completed. You can replace the AUDIO_PLACEHOLDER with real AWS S3 links in the future.');
  await app.close();
}

bootstrap();
