const discordPFP = new DiscordPFP("YOUR_CLIENT_ID", "YOUR_REDIRECT_URI");

// If the user hasn't authorized yet, redirect them to the Discord login page
discordPFP.redirectToDiscordAuth();

// If the user is redirected back with a code, handle the OAuth callback
discordPFP.handleOAuthCallback();