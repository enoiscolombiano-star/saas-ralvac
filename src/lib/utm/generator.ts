type UTMParams = {  
  campaignName: string;  
  source?: string;  
  medium?: string;  
  content?: string;  
  term?: string;  
};  
  
export function generateUTMLink(baseUrl: string, params: UTMParams): string {  
  const url = new URL(baseUrl);  
    
  url.searchParams.set('utm_campaign', params.campaignName);  
    
  if (params.source) {  
    url.searchParams.set('utm_source', params.source);  
  }  
    
  if (params.medium) {  
    url.searchParams.set('utm_medium', params.medium);  
  }  
    
  if (params.content) {  
    url.searchParams.set('utm_content', params.content);  
  }  
    
  if (params.term) {  
    url.searchParams.set('utm_term', params.term);  
  }  
    
  return url.toString();  
}  
  
export function parseUTMLink(url: string): UTMParams | null {  
  try {  
    const urlObj = new URL(url);  
    const campaignName = urlObj.searchParams.get('utm_campaign');  
      
    if (!campaignName) return null;  
      
    return {  
      campaignName,  
      source: urlObj.searchParams.get('utm_source') || undefined,  
      medium: urlObj.searchParams.get('utm_medium') || undefined,  
      content: urlObj.searchParams.get('utm_content') || undefined,  
      term: urlObj.searchParams.get('utm_term') || undefined,  
    };  
  } catch {  
    return null;  
  }  
}