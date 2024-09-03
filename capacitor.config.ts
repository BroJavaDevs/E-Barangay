import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'E-Barangay App',
  webDir: 'build',
  server: {
    url: 'https://barangay82.brojava.com',
    cleartext: false
  }
};

export default config;
