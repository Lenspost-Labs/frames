/** @jsxImportSource @airstack/frog/jsx */
import { serveStatic } from '@airstack/frog/serve-static';
import { Button, Frog } from '@airstack/frog';
import { devtools } from '@airstack/frog/dev';
import { handle } from '@airstack/frog/next';
import { AIRSTACK_API_KEY } from '@/data';

// Instantiate new Frog instance with Airstack API key
export const app = new Frog({
  apiKey: AIRSTACK_API_KEY as string,
  basePath: '/api'
});

app.frame('/', async (c) => {
  const { status } = c;
  return c.res({
    image: (
      <div
        style={{
          display: 'flex',
          color: 'white',
          fontSize: 40
        }}
      >
        {status === 'initial' ? 'Initial Frame' : 'Response Frame'}
      </div>
    ),
    intents: [status === 'initial' && <Button>Click Here</Button>]
  });
});

devtools(app, { serveStatic });
export const GET = handle(app);
export const POST = handle(app);
