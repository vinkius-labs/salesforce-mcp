import { createPresenter, ui } from '@mcpfusion/core';
import { SFListModel } from '../models/index.js';
interface SFData { type?: string; items_raw?: Record<string, any>[]; }
export const SFPresenter = createPresenter('Salesforce')
  .schema(SFListModel as any).rules([]).limit(100)
  .ui((data: unknown) => {
    const d = data as SFData;
    let t = `☁️ **Salesforce: ${String(d.type || 'LIST').toUpperCase()}**\n\n`;
    const items = d.items_raw || [];
    if (!items.length) t += `> No records.\n`;
    for (const i of items) { t += `- **${i.Name || i.Subject || i.Id || 'N/A'}**\n`; }
    return [ui.markdown(t)];
  });
