import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Brgy82',
  webDir: 'build',
  server: {
    url: 'https://barangay82.brojava.com/',
  },
  android: {
    backgroundColor: '#f97316',
  }
};

export default config;
