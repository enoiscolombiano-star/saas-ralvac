// Mock client para integração com UTMify  
// Em produção, substituir por chamadas reais à API do UTMify  
  
type UTMifyMetrics = {  
  impressoes: number;  
  cliques: number;  
  conversoes: number;  
  gastoTotal: number;  
};  
  
class UTMifyClient {  
  private apiKey: string;  
  private baseUrl: string;  
  
  constructor() {  
    this.apiKey = process.env.UTMIFY_API_KEY || '';  
    this.baseUrl = process.env.UTMIFY_BASE_URL || 'https://api.utmify.com';  
  }  
  
  async getAdMetrics(adId: string): Promise<UTMifyMetrics> {  
    // Mock implementation - substituir por chamada real  
    // const response = await fetch(`${this.baseUrl}/ads/${adId}/metrics`, {  
    //   headers: {  
    //     'Authorization': `Bearer ${this.apiKey}`  
    //   }  
    // });  
    // return response.json();  
  
    // Mock data para desenvolvimento  
    return {  
      impressoes: Math.floor(Math.random() * 10000),  
      cliques: Math.floor(Math.random() * 500),  
      conversoes: Math.floor(Math.random() * 50),  
      gastoTotal: Math.random() * 1000  
    };  
  }  
  
  async getCampaignMetrics(campaignName: string): Promise<UTMifyMetrics> {  
    // Mock implementation  
    return {  
      impressoes: Math.floor(Math.random() * 50000),  
      cliques: Math.floor(Math.random() * 2500),  
      conversoes: Math.floor(Math.random() * 250),  
      gastoTotal: Math.random() * 5000  
    };  
  }  
}  
  
export const utmifyClient = new UTMifyClient();