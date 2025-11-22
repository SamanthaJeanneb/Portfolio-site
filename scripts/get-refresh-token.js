/**
 * Script to generate Google OAuth refresh token
 * Run: node scripts/get-refresh-token.js
 * 
 * Make sure to set these environment variables:
 * GOOGLE_CLIENT_ID=your_client_id
 * GOOGLE_CLIENT_SECRET=your_client_secret
 */

const { google } = require('googleapis');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob' // This is for desktop apps
);

const scopes = [
  'https://www.googleapis.com/auth/calendar.readonly'
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent', // Force consent to get refresh token
});

console.log('Authorize this app by visiting this url:', authUrl);
console.log('\nAfter authorizing, you will be redirected to a page.');
console.log('Copy the "code" parameter from the URL and paste it below.\n');

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error('Error retrieving access token', err);
      return;
    }
    
    console.log('\n✅ Success! Here are your tokens:\n');
    console.log('REFRESH_TOKEN:', token.refresh_token);
    console.log('\nAdd this to your .env.local file:');
    console.log(`GOOGLE_REFRESH_TOKEN=${token.refresh_token}`);
  });
});




