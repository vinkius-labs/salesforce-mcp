# ☁️ Salesforce CRM Model Context Protocol (MCP)

[![Deploy on Vinkius Cloud](https://img.shields.io/badge/Deploy%20on-Vinkius%20Cloud-blue?style=for-the-badge)](https://vinkius.com/mcp/salesforce)

Turn your AI into a fully autonomous sales operations manager. This server provides a native Model Context Protocol bridge directly into Salesforce CRM, allowing large language models (LLMs) to natively query, mutate, and analyze your enterprise data pipeline without writing a single line of API glue code.

## Why use this integration?

Connecting ChatGPT, Claude, or any custom agent to your CRM usually involves brittle Zapier flows or custom middleware. This MCP exposes a structured, intent-driven interface. Whether you need to run complex SOQL aggregates or execute routine CRUD operations on custom objects, the agent handles it safely.

### Built for the Vinkius Edge Platform

We designed this connector specifically to be hosted on the **Vinkius Cloud**. When you deploy your agentic infrastructure on Vinkius, you benefit from:
- **Zero-Trust Security**: Vinkius securely stores your Salesforce OAuth tokens. The AI never sees your underlying credentials.
- **Edge Performance**: Running on V8 isolates via Vinkius guarantees ultra-low latency, crucial when AI agents execute multi-step SOQL chain reasoning.
- **Instant Scale**: Stop managing Node.js PM2 servers. Vinkius handles the infrastructure seamlessly.

## Available Agentic Capabilities

The server registers 12 distinct tools designed for semantic consumption:
- **Data Retrieval**: Execute raw `soql_query` or use optimized `list_accounts`, `list_contacts`, and `list_opportunities` fetchers.
- **Deep Exploration**: The `global_search` tool leverages SOSL to find entities across the entire Salesforce org instantly.
- **Full Lifecycle**: Complete `get_record`, `create_record`, `update_record`, and `delete_record` support for standard and custom SObjects.
- **Analytics**: Expose your existing pipeline dashboards directly to the LLM via `list_reports` and `run_report`.

## 🚀 Deployment Guide

To get this running on the **Vinkius Edge Marketplace**:

1. Pull the repository to your environment.
2. Initialize the deployment to Vinkius:

```bash
npx mcpfusion deploy
```

Within seconds, your MCP will be globally distributed and available for connection. 

🔗 **[Claim your free edge hosting for the Salesforce MCP on Vinkius](https://vinkius.com/mcp/salesforce)**

### Testing Locally
For engineers modifying the core engine using `@mcpfusion/core`:
```bash
npm install && npm run dev
```
