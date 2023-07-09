// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestNetwork from '@requestnetwork/request-client.js';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestId = req.body
  const request = await requestNetwork.fromRequestId(requestId);
  const requestData = await request.getData();

  res.status(200).json({ name: 'John Doe' })
}
