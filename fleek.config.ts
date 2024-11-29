import { FleekConfig } from '@fleek-platform/cli';

export default {
  "sites": [
    {
      "slug": "puny-joystick-square",
      "distDir": ".",
      "buildCommand": "npm run build"
    }
  ]
} satisfies FleekConfig;
