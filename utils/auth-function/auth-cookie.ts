import { serialize } from 'cookie';

export const MAX_AGE = 60 * 60 * 8; // 8 hours

export const setTokenCookie = (res: any, token: any) => {
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/'
  });
  res.setHeader('Set-Cookie', cookie);
};
