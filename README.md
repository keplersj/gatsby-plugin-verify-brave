# gatsby-plugin-verify-brave

Gatsby plugin for [Brave Rewards](https://creators.brave.com/) Verification. No need to include a TXT file in your `static` directory, let us take care of that! This plugin will create help verify you own your website with Brave Rewards, see [the Brave Creators documentation on Verifying Ownership for more details](https://support.brave.com/hc/en-us/articles/360018210951-How-do-I-verify-my-website-or-domain-with-Brave-Payments-Video-Tutorial-).

## Installation

```bash
npm install gatsby-plugin-verify-brave
```

## Usage

Add the plugin, your Brave Rewards Token, and (optionally) your domain in your `gatsby-config.js`:

```json
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-verify-brave",
      options: {
        token: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        domain: "test.dev"
      }
    }
  ]
};

```

## License

Copyright 2019 [Kepler Sticka-Jones](https://keplersj.com/). Licensed MIT.
