import express, { Request, Response } from 'express';
import docs from "@googleapis/docs"
import { google } from 'googleapis';
const REDIRECT_URI = 'http://localhost:3000/api/v1/user/google/callback';

const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile',
'https://www.googleapis.com/auth/userinfo.email'];
class GoogleAuthRepository {
  oAuth2Client: any
  constructor() {
    this.oAuth2Client = new docs.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
    });
  }
    
  async getAuthUrl(): Promise<string> {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'online',
        scope: SCOPES,
      });
      return authUrl;
  }
  
  async getAccessToken(code: string): Promise<any> {
      const { tokens } = await this.oAuth2Client.getToken(code);
      return tokens;
  }
  
  async getUserProfile(tokens: any): Promise<any> {
      this.oAuth2Client.setCredentials(tokens);
      const userInfo = await this.oAuth2Client.userinfo.get({
        auth: this.oAuth2Client,
      });
      
      return userInfo.data;
  }

}
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const a = new docs.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
})

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

export default app