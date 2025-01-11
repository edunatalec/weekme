import { AnimeStatus, Prisma, PrismaClient } from '@prisma/client';
import { load } from 'cheerio';
import puppeteer, { Browser } from 'puppeteer';

const STATUS_MAP = {
  Finished: AnimeStatus.FINISHED,
  Releasing: AnimeStatus.RELEASING,
  'Not Yet Released': AnimeStatus.TO_RELEASE,
  Cancelled: AnimeStatus.HIATUS,
};

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const prisma = new PrismaClient();

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://anichart.net/airing', {
    waitUntil: 'domcontentloaded',
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const html = await page.content();
  const $ = load(html);

  for (const day of $('.day').toArray()) {
    const weekday = WEEKDAYS.findIndex(
      (weekday) =>
        weekday === $(day).find('h2').eq(0).text().trim().split(' ')[0],
    );

    for (const el of $(day).find('.cards .airing-card a')) {
      await getAnime(browser, $(el).attr('href'), weekday);
    }
  }

  await page.close();
  await browser.close();
};

const getAnime = async (browser: Browser, link: string, weekday: number) => {
  const page = await browser.newPage();

  try {
    await page.goto(link, {
      waitUntil: 'domcontentloaded',
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const html = await page.content();
    const $ = load(html);

    const getValueByType = (type: string) => {
      return $('.data-set')
        .filter((_, el) => $(el).find('.type').text().includes(type))
        .find('.value')
        .text();
    };

    const status = getValueByType('Status');
    const startDate = getValueByType('Start Date');
    const endDate = getValueByType('End Date');

    const backgroundUrl = $('.banner').attr('style');

    const anime: Prisma.AnimeCreateInput = {
      name: $('.header .content h1').text().trim(),
      imageUrl: $('.header img').attr('src').trim(),
      backgroundUrl: backgroundUrl && backgroundUrl.match(/url\("(.+?)"\)/)[1],
      status: STATUS_MAP[status] || AnimeStatus.TO_RELEASE,
      synopsis: $('.header .description').text().trim(),
      weekday,
      startDate: (startDate && new Date(startDate)) || undefined,
      finishDate: (endDate && new Date(endDate)) || undefined,
    };

    await prisma.anime.create({ data: anime });

    console.log('Anime:', anime.name, 'criado com sucesso!');
  } catch (_) {
  } finally {
    await page.close();
  }
};

main();
