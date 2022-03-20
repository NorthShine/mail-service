import { OAuth2Client } from 'google-auth-library';

interface IGoogleClientReturnType {
  oauth2Client: OAuth2Client;
  accessToken: string;
}

export const googleClientInstance = async (): Promise<IGoogleClientReturnType> => {
  const oauth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });

  return {
    oauth2Client,
    accessToken
  };
};
