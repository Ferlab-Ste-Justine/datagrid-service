import { env } from './config/env';
import app from './app';

const PORT = env.app.port;

app.listen(PORT, () => {
    console.log(`Id Service running at ${env.app.schema}://${env.app.host}:${PORT}`);
});
