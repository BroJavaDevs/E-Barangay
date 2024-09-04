import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Brgy82 Announcements',
  webDir: 'build',
  server: {
    url: 'https://barangay82.brojava.com/',
    cleartext: false
  }
};

export default config;
