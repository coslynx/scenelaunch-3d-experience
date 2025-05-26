import * as THREE from 'three'
/**
 * Provides utility functions for formatting data, such as numbers, dates, and strings, ensuring consistent and user-friendly data presentation throughout the landing page.
 * @module utils/format
 */
/**
 * Formats a number using Intl.NumberFormat.
 * @param number The number to format.
 * @param options Optional Intl.NumberFormatOptions for customization.
 * @returns A formatted number string, or 'N/A' if the input is null or undefined.
 */
const formatNumber=(number:number|null|undefined,options?:Intl.NumberFormatOptions):string=>{if(number===null||number===undefined)return'N/A';return new Intl.NumberFormat(undefined,options).format(number);};
/**
 * Formats a date using Intl.DateTimeFormat.
 * @param date The date to format (Date object, date string, null, or undefined).
 * @param options Optional Intl.DateTimeFormatOptions for customization.
 * @returns A formatted date string, or 'N/A' if the input is null or undefined.
 */
const formatDate=(date:Date|string|null|undefined,options?:Intl.DateTimeFormatOptions):string=>{if(date===null||date===undefined)return'N/A';try{const dateObj=typeof date==='string'?new Date(date):date;return new Intl.DateTimeFormat(undefined,options).format(dateObj);}catch(e){console.error('Invalid date',date);return'N/A';}};
/**
 * Truncates a string to a specified maximum length.
 * @param text The string to truncate.
 * @param maxLength The maximum length of the string (default: 20).
 * @param suffix The suffix to add if the string is truncated (default: "...").
 * @returns The truncated string, or an empty string if the input is null or undefined.
 */
const truncateString=(text:string|null|undefined,maxLength:number=20,suffix:string='...'):string=>{if(text===null||text===undefined)return'';if(text.length<=maxLength)return text;return text.substring(0,maxLength)+suffix;};
/**
 * Formats a THREE.Vector3 to a string with a specified precision.
 * @param vector The Vector3 to format.
 * @param precision The number of decimal places to use (default: 2).
 * @returns A formatted string representation of the Vector3, or "(N/A, N/A, N/A)" if the input is null or undefined.
 */
const formatVector3=(vector:THREE.Vector3|null|undefined,precision:number=2):string=>{if(!vector)return'(N/A, N/A, N/A)';return`(${vector.x.toFixed(precision)}, ${vector.y.toFixed(precision)}, ${vector.z.toFixed(precision)})`;};
/**
 * Formats a numerical value as a percentage change with specified prefixes for positive and negative values.
 * @param value The number to format.
 * @param options Optional configuration object with 'positivePrefix' and 'negativePrefix' to customize output.
 * @returns A formatted percentage string, or 'N/A' if the input is null or undefined.
 */
const formatPercentageChange=(value:number|null|undefined,options?:{positivePrefix?:string;negativePrefix?:string}):string=>{if(value===null||value===undefined)return'N/A';const positivePrefix=options?.positivePrefix||'+';const negativePrefix=options?.negativePrefix||'-';const absValue=Math.abs(value);const formattedValue=new Intl.NumberFormat(undefined,{style:'percent',minimumFractionDigits:2,signDisplay:'exceptZero'}).format(absValue);return value>=0?positivePrefix+formattedValue:negativePrefix+formattedValue;};
/**
 * Formats a file size in bytes to a human-readable string (e.g., "1.23 MB").
 * @param bytes The file size in bytes.
 * @param decimals The number of decimal places to use (default: 2).
 * @returns A formatted file size string, or 'N/A' if the input is null or undefined.
 */
const formatFileSize=(bytes:number|null|undefined,decimals:number=2):string=>{if(bytes===null||bytes===undefined)return'N/A';if(bytes===0)return'0 Bytes';const k=1024;const dm=decimals<0?0:decimals;const sizes=['Bytes','KB','MB','GB','TB','PB','EB','ZB','YB'];const i=Math.floor(Math.log(bytes)/Math.log(k));return parseFloat((bytes/Math.pow(k,i)).toFixed(dm))+' '+sizes[i];};
/**
 * Sanitizes a string to prevent XSS vulnerabilities.
 * @param text The string to sanitize.
 * @returns The sanitized string, or an empty string if the input is null or undefined.
 */
const sanitizeString=(text:string|null|undefined):string=>{if(text===null||text===undefined)return'';let sanitized=text;try{if(typeof DOMPurify!=='undefined'){sanitized=DOMPurify.sanitize(text);}}catch(error){console.warn('DOMPurify not available, falling back to basic escaping');sanitized=text.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}return sanitized;};
export{formatNumber,formatDate,truncateString,formatVector3,formatPercentageChange,formatFileSize,sanitizeString};