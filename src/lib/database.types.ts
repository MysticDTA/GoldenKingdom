// src/lib/database.types.ts
export type Database = {
  public: {
    Tables: {
      glyphs: {
        Row: {
          id: string;
          name: string;
          meaning: string | null;
          description?: string | null;
          image_url?: string | null;
          created_at: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          created_at: string | null;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          content: string | null;
          created_at: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          content: string;
          created_at: string | null;
        };
      };
    };
  };
};
