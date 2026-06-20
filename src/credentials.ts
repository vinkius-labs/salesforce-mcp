import { defineCredentials } from '@mcpfusion/core';
export const credentials = defineCredentials({
    SALESFORCE_INSTANCE_URL: { label: 'Instance URL', description: 'Your Salesforce instance URL (e.g. https://myorg.my.salesforce.com).', placeholder: 'https://myorg.my.salesforce.com', type: 'api_key', required: true, sensitive: false, group: 'CRM' },
    SALESFORCE_ACCESS_TOKEN: { label: 'Access Token', description: 'OAuth 2.0 Bearer token from Salesforce Connected App.', placeholder: '00D...', type: 'api_key', required: true, sensitive: true, group: 'CRM' }
});
