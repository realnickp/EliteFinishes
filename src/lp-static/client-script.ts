export interface ClientScriptConfig {
  slug: string;
  serviceTitle: string;
  googleAdsId: string;
  callLabel: string;
  contactLabel: string;
  metaPixelId: string;
  phone: string;
}

export function buildClientScript(_cfg: ClientScriptConfig): string {
  return "";
}
