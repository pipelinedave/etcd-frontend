import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();

app.use(express.static('dist'));

app.get('/v3/kv/range', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${process.env.ETCD_HOST || 'http://localhost:2379'}/v3/kv/range`,
      {
        params: req.query
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/v3/kv/put', async (req: Request, res: Response) => {
  try {
    await axios.post(
      `${process.env.ETCD_HOST || 'http://localhost:2379'}/v3/kv/put`,
      {
        key: req.body.key,
        value: req.body.value
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/v3/kv/delete', async (req: Request, res: Response) => {
  try {
    await axios.post(
      `${process.env.ETCD_HOST || 'http://localhost:2379'}/v3/kv/deletex`,
      {
        key: req.body.key
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
