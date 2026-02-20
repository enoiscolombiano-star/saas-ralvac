type UTMParams = {  
  campaignName: string;  // NÃO 'campaign'  
  funcao: string;  
  copy: string;  
  lead: string;  
  editor: string;  
  hook: string;  
  persona: string;  
};  
  
export function generateUTMLink(baseUrl: string, params: UTMParams): string {  
  const utmParams = new URLSearchParams({  
    utm_campaign: params.campaignName,  // Usar campaignName  
    utm_source: params.funcao,  
    utm_medium: params.copy,  
    utm_content: `${params.lead}_${params.editor}_${params.hook}_${params.persona}`  
  });  
  
  return `${baseUrl}?${utmParams.toString()}`;  
}