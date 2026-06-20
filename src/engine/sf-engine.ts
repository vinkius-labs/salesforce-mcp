export interface SFConfig { instanceUrl: string; token: string; }
const API_VER = 'v60.0';

async function fetchSF(c: SFConfig, path: string, method = 'GET', body?: any) {
    const url = `${c.instanceUrl}/services/data/${API_VER}/${path}`;
    const opts: RequestInit = { method, headers: { 'Authorization': `Bearer ${c.token}`, 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    if (!res.ok) { const e = await res.text().catch(() => ''); throw new Error(`Salesforce [${res.status}]: ${e}`); }
    if (res.status === 204) return {};
    return await res.json();
}
function wrap(type: string, data: any, key?: string) { const items = key && data[key] ? data[key] : Array.isArray(data) ? data : [data]; return { type, items: JSON.stringify(items), items_raw: items }; }

// SOQL Query
export async function soqlQuery(c: SFConfig, query: string) { return wrap('query', await fetchSF(c, `query/?q=${encodeURIComponent(query)}`), 'records'); }
// SObjects CRUD
export async function listRecords(c: SFConfig, sobject: string, limit = 50) { return soqlQuery(c, `SELECT Id, Name FROM ${sobject} ORDER BY CreatedDate DESC LIMIT ${limit}`); }
export async function getRecord(c: SFConfig, sobject: string, id: string) { return wrap(sobject.toLowerCase(), await fetchSF(c, `sobjects/${sobject}/${id}`)); }
export async function createRecord(c: SFConfig, sobject: string, body: any) { return wrap(`${sobject.toLowerCase()}_created`, await fetchSF(c, `sobjects/${sobject}`, 'POST', body)); }
export async function updateRecord(c: SFConfig, sobject: string, id: string, body: any) { await fetchSF(c, `sobjects/${sobject}/${id}`, 'PATCH', body); return wrap(`${sobject.toLowerCase()}_updated`, [{ id, status: 'updated' }]); }
export async function deleteRecord(c: SFConfig, sobject: string, id: string) { await fetchSF(c, `sobjects/${sobject}/${id}`, 'DELETE'); return wrap(`${sobject.toLowerCase()}_deleted`, [{ id, status: 'deleted' }]); }
// Search
export async function globalSearch(c: SFConfig, query: string) { return wrap('search', await fetchSF(c, `search/?q=${encodeURIComponent(`FIND {${query}}`)}`), 'searchRecords'); }
// Describe
export async function describeObject(c: SFConfig, sobject: string) { const d = await fetchSF(c, `sobjects/${sobject}/describe`); return wrap('describe', [{ name: d.name, label: d.label, fields: d.fields?.length, keyPrefix: d.keyPrefix }]); }
// Reports
export async function listReports(c: SFConfig) { return soqlQuery(c, 'SELECT Id, Name, DeveloperName FROM Report ORDER BY Name LIMIT 100'); }
export async function runReport(c: SFConfig, reportId: string) { return wrap('report_result', await fetchSF(c, `analytics/reports/${reportId}`, 'POST')); }
