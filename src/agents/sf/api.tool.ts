import { f } from '../../mcpfusion.js';
import { requireCredential } from '@mcpfusion/core';
import { SFPresenter } from '../../views/index.js';
import { soqlQuery, listRecords, getRecord, createRecord, updateRecord, deleteRecord, globalSearch, describeObject, listReports, runReport } from '../../engine/sf-engine.js';

function gc() { return { instanceUrl: requireCredential('SALESFORCE_INSTANCE_URL'), token: requireCredential('SALESFORCE_ACCESS_TOKEN') }; }

export const t1 = f.query('soql_query').describe('Execute a SOQL query against Salesforce.').instructions('Run any SOQL query to retrieve records. Example: SELECT Id, Name FROM Account WHERE Industry = \'Technology\' LIMIT 10').withString('query','SOQL query string').egress(5*1024*1024).returns(SFPresenter).handle(async(i)=>soqlQuery(gc(),i.query));

export const t2 = f.query('list_accounts').describe('List Salesforce accounts.').instructions('Returns account names and IDs ordered by creation date.').withOptionalNumber('limit','Max records').egress(2*1024*1024).returns(SFPresenter).handle(async(i)=>listRecords(gc(),'Account',i.limit||50));

export const t3 = f.query('list_contacts').describe('List Salesforce contacts.').instructions('Returns contact names and IDs ordered by creation date.').withOptionalNumber('limit','Max records').egress(2*1024*1024).returns(SFPresenter).handle(async(i)=>listRecords(gc(),'Contact',i.limit||50));

export const t4 = f.query('list_opportunities').describe('List sales opportunities.').instructions('Returns opportunity names and IDs ordered by creation date.').withOptionalNumber('limit','Max records').egress(2*1024*1024).returns(SFPresenter).handle(async(i)=>listRecords(gc(),'Opportunity',i.limit||50));

export const t5 = f.query('get_record').describe('Get a specific Salesforce record by type and ID.').instructions('Fetches full record data. Specify the SObject type (Account, Contact, Opportunity, Case, Lead) and the record ID.').withString('sobject','SObject type (Account, Contact, etc.)').withString('id','Record ID (18-char)').egress(2*1024*1024).returns(SFPresenter).handle(async(i)=>getRecord(gc(),i.sobject,i.id));

export const t6 = f.mutation('create_record').describe('Create a new Salesforce record.').instructions('Creates a record of any SObject type. Provide JSON fields as a string.').withString('sobject','SObject type').withString('json_fields','JSON string of field values').returns(SFPresenter).handle(async(i)=>{let p;try{p=JSON.parse(i.json_fields)}catch{throw new Error('Invalid JSON');}return createRecord(gc(),i.sobject,p);});

export const t7 = f.mutation('update_record').describe('Update an existing Salesforce record.').instructions('Updates specific fields on a record. Provide the SObject type, ID, and JSON fields to update.').withString('sobject','SObject type').withString('id','Record ID').withString('json_fields','JSON string of fields to update').returns(SFPresenter).handle(async(i)=>{let p;try{p=JSON.parse(i.json_fields)}catch{throw new Error('Invalid JSON');}return updateRecord(gc(),i.sobject,i.id,p);});

export const t8 = f.mutation('delete_record').describe('Delete a Salesforce record.').instructions('Permanently removes a record. This action is irreversible.').withString('sobject','SObject type').withString('id','Record ID').returns(SFPresenter).handle(async(i)=>deleteRecord(gc(),i.sobject,i.id));

export const t9 = f.query('global_search').describe('Search across all Salesforce objects.').instructions('Full-text search using SOSL. Returns matches across Accounts, Contacts, Leads, and other objects simultaneously.').withString('query','Search text').egress(2*1024*1024).returns(SFPresenter).handle(async(i)=>globalSearch(gc(),i.query));

export const t10 = f.query('describe_object').describe('Get metadata about a Salesforce object.').instructions('Returns object schema including field count, label, and key prefix. Useful for understanding data structure.').withString('sobject','SObject type to describe').egress(2*1024*1024).returns(SFPresenter).handle(async(i)=>describeObject(gc(),i.sobject));

export const t11 = f.query('list_reports').describe('List available Salesforce reports.').instructions('Returns all reports with their IDs and developer names for subsequent execution.').egress(2*1024*1024).returns(SFPresenter).handle(async()=>listReports(gc()));

export const t12 = f.mutation('run_report').describe('Execute a Salesforce report and get results.').instructions('Runs a report by ID and returns the aggregated data. Use list_reports first to find the report ID.').withString('report_id','Report ID').returns(SFPresenter).handle(async(i)=>runReport(gc(),i.report_id));
