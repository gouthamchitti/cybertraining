export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          location: string | null
          skills: Json | null
          experience_level: string | null
          preferences: Json | null
          last_login: string | null
          total_points: number
          rank: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          skills?: Json | null
          experience_level?: string | null
          preferences?: Json | null
          last_login?: string | null
          total_points?: number
          rank?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          skills?: Json | null
          experience_level?: string | null
          preferences?: Json | null
          last_login?: string | null
          total_points?: number
          rank?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subscription_tiers: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          features: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          features?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          features?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          id: number
          user_id: string
          tier_id: number
          start_date: string
          end_date: string | null
          is_active: boolean
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          tier_id: number
          start_date?: string
          end_date?: string | null
          is_active?: boolean
          payment_status?: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          tier_id?: number
          start_date?: string
          end_date?: string | null
          is_active?: boolean
          payment_status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          id: number
          title: string
          description: string | null
          level: string | null
          duration: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          level?: string | null
          duration?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          level?: string | null
          duration?: string | null
          image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      modules: {
        Row: {
          id: number
          course_id: number
          title: string
          description: string | null
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: number
          course_id: number
          title: string
          description?: string | null
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          course_id?: number
          title?: string
          description?: string | null
          order_index?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      lessons: {
        Row: {
          id: number
          module_id: number
          title: string
          content: string | null
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: number
          module_id: number
          title: string
          content?: string | null
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          module_id?: number
          title?: string
          content?: string | null
          order_index?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          }
        ]
      }
      user_progress: {
        Row: {
          id: number
          user_id: string
          lesson_id: number
          completed: boolean
          last_accessed: string
        }
        Insert: {
          id?: number
          user_id: string
          lesson_id: number
          completed?: boolean
          last_accessed?: string
        }
        Update: {
          id?: number
          user_id?: string
          lesson_id?: number
          completed?: boolean
          last_accessed?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      challenges: {
        Row: {
          id: number
          title: string
          description: string
          difficulty: string
          category: string
          points: number
          content: Json
          solution: string | null
          hints: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          difficulty: string
          category: string
          points: number
          content: Json
          solution?: string | null
          hints?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          difficulty?: string
          category?: string
          points?: number
          content?: Json
          solution?: string | null
          hints?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_challenges: {
        Row: {
          id: number
          user_id: string
          challenge_id: number
          status: string
          attempts: number
          completed_at: string | null
          points_earned: number
          solution_submitted: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          challenge_id: number
          status?: string
          attempts?: number
          completed_at?: string | null
          points_earned?: number
          solution_submitted?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          challenge_id?: number
          status?: string
          attempts?: number
          completed_at?: string | null
          points_earned?: number
          solution_submitted?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      badges: {
        Row: {
          id: number
          name: string
          description: string
          image_url: string | null
          criteria: Json
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          image_url?: string | null
          criteria: Json
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          image_url?: string | null
          criteria?: Json
          created_at?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          id: number
          user_id: string
          badge_id: number
          earned_at: string
        }
        Insert: {
          id?: number
          user_id: string
          badge_id: number
          earned_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          badge_id?: number
          earned_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_analytics: {
        Row: {
          id: number
          user_id: string
          event_type: string
          event_data: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          event_type: string
          event_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          event_type?: string
          event_data?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: number
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          data: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          message: string
          type: string
          is_read?: boolean
          data?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          data?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      leaderboard: {
        Row: {
          user_id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          total_points: number
          rank: string | null
          badges_count: number
          challenges_completed: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
