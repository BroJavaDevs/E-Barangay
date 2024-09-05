import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brojava.barangay82',
  appName: 'Brgy82',
  webDir: 'build',
  server: {
    url: 'https://barangay82.brojava.com/',
  },
  plugins: {

  },
  android: {
    backgroundColor: '#f97316',
  }
};

export default config;
