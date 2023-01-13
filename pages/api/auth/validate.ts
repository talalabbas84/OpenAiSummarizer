import Iron from '@hapi/iron';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function validate(req: NextApiRequest, res: NextApiResponse ) {
  const token = req.cookies.token;
  // if no token, return 401
  if (!token) {
    return res.status(401).end();
  }
  try {
    const session = await Iron.unseal(
      token,
      process.env.ENCRYPTION_SECRET || '',
      Iron.defaults
    );

    return res.json(session);
  } catch (error) {
    // if invalid, return 401
    res.status(401).end();
  }
}
