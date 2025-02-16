import puppeteer from '@cloudflare/puppeteer';
import { Hono } from 'hono';

type Bindings = {
  MYBROWSER: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
  const browser = await puppeteer.launch(c.env.MYBROWSER);

  try {
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    const title = await page.title();

    return c.text(title);
  } finally {
    await browser.close();
  }
});

export default app;
