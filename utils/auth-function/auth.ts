import Iron from '@hapi/iron';
import { MAX_AGE, setTokenCookie } from './auth-cookie';

export const SetLoginSession = async (res: any, metadata: any) => {
  const session = {
    ...metadata,
    createdAt: Date.now(),
    maxAge: MAX_AGE
  };
  const token = await Iron.seal(
    session,
    process.env.ENCRYPTION_SECRET as string,
    Iron.defaults
  );

  setTokenCookie(res, token);
};
