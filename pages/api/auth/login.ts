import { Magic } from '@magic-sdk/admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { SetLoginSession } from '../../../utils/auth-function/auth';


export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const magic = new Magic(process.env.MAGIC_SECRET_KEY);
  const didToken = req.headers.authorization?.substr(7);
  const metadata = await magic.users.getMetadataByToken(didToken as string);

  await SetLoginSession(res, metadata);
  res.status(200).json({ email: metadata.email });
}
