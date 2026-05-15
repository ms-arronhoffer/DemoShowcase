export interface Demo {
  id: string;
  title: string;
  description: string;
  tags: string[];
  video_url: string | null;
  repo_url: string | null;
  thumbnail_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface GalleryConfig {
  title: string;
  subtitle: string;
  demos: Demo[];
}
