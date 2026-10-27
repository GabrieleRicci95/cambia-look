import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gardigital.cambialook',
  appName: 'Cambia Look',
  webDir: 'out',
  server: {
    url: 'https://cambia-look.vercel.app',
    cleartext: true,
    allowNavigation: [
      'cambia-look.vercel.app',
      '*.vercel.app'
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#D11936',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#A60F25',
    },
  },
};

export default config;
