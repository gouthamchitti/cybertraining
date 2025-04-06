import { supabase } from '@/utils/supabase';

export interface SEOMetadata {
  id?: number;
  page_path: string;
  title: string;
  description: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  created_at?: string;
  updated_at?: string;
}

export const seoService = {
  /**
   * Get SEO metadata for a specific page
   */
  async getMetadataForPage(pagePath: string): Promise<SEOMetadata | null> {
    const { data, error } = await supabase
      .from('seo_metadata')
      .select('*')
      .eq('page_path', pagePath)
      .single();
      
    if (error) {
      console.error('Error fetching SEO metadata:', error);
      return null;
    }
    
    return data;
  },
  
  /**
   * Get all SEO metadata
   */
  async getAllMetadata(): Promise<SEOMetadata[]> {
    const { data, error } = await supabase
      .from('seo_metadata')
      .select('*')
      .order('page_path');
      
    if (error) {
      console.error('Error fetching all SEO metadata:', error);
      return [];
    }
    
    return data || [];
  },
  
  /**
   * Create or update SEO metadata for a page
   */
  async upsertMetadata(metadata: SEOMetadata): Promise<SEOMetadata | null> {
    const { data, error } = await supabase
      .from('seo_metadata')
      .upsert(metadata, { onConflict: 'page_path' })
      .select()
      .single();
      
    if (error) {
      console.error('Error upserting SEO metadata:', error);
      return null;
    }
    
    return data;
  },
  
  /**
   * Delete SEO metadata for a page
   */
  async deleteMetadata(pagePath: string): Promise<boolean> {
    const { error } = await supabase
      .from('seo_metadata')
      .delete()
      .eq('page_path', pagePath);
      
    if (error) {
      console.error('Error deleting SEO metadata:', error);
      return false;
    }
    
    return true;
  }
};
