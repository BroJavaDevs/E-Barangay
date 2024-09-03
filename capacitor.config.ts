import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'E-Barangay App',
  webDir: 'build',
  server: {
    url: 'http://192.168.8.255:5173',
    cleartext: true
  }
};

export default config;
