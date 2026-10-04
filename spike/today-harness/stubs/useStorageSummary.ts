const GB = 1024 ** 3;
const MB = 1024 ** 2;

const summary = {
  location: { path: String.raw`C:\Users\ana\AppData\Roaming\Archipelia\Data`, canReveal: true },
  totalBytes: 2.41 * GB,
  domains: [
    { domain: 'runs', label: 'Session runs', count: 14, bytes: 1.62 * GB },
    { domain: 'worlds', label: 'Installed worlds', count: 9, bytes: 512 * MB },
    { domain: 'engine', label: 'Engine', count: 1, bytes: 288 * MB },
    { domain: 'presets', label: 'Presets', count: 23, bytes: 0.4 * MB },
  ],
};

const useStorageSummary = () => ({ error: null, retry: () => {}, reveal: () => {}, summary });

export { useStorageSummary };
