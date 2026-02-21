export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      client_certificates: {
        Row: {
          client_id: string
          created_at: string | null
          expiration_date: string | null
          id: string
          issuer: string | null
          notes: string | null
          password: string | null
          status: string | null
          type: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          issuer?: string | null
          notes?: string | null
          password?: string | null
          status?: string | null
          type?: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          issuer?: string | null
          notes?: string | null
          password?: string | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_certificates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_credentials: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          login: string | null
          notes: string | null
          password: string | null
          platform: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          login?: string | null
          notes?: string | null
          password?: string | null
          platform: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          login?: string | null
          notes?: string | null
          password?: string | null
          platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_credentials_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_permits: {
        Row: {
          client_id: string
          created_at: string | null
          document_number: string | null
          expiration_date: string | null
          id: string
          issue_date: string | null
          name: string
          notes: string | null
          status: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          document_number?: string | null
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          name: string
          notes?: string | null
          status?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          document_number?: string | null
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          name?: string
          notes?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_permits_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_proxies: {
        Row: {
          client_id: string
          created_at: string | null
          expiration_date: string | null
          id: string
          organ: string
          status: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          organ: string
          status?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          organ?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_proxies_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          business_group: string | null
          capital_social: number | null
          churn_reason: string | null
          city_state: string | null
          client_since: string | null
          cnae_main: string | null
          cnae_secondary: string[] | null
          cnpj: string | null
          code: string | null
          company_name: string | null
          company_size: string | null
          control_group: string | null
          created_at: string | null
          custom_fields: Json | null
          email: string | null
          fiscal_closing_method: string | null
          fiscal_responsible: string | null
          health_score: number | null
          id: string
          last_contact: string | null
          legal_nature: string | null
          mrr: number | null
          nickname: string | null
          obligation_profile: Json | null
          opening_date: string | null
          personnel_closing_method: string | null
          personnel_responsible: string | null
          phone: string | null
          segment: string | null
          situation: string | null
          state_registration: string | null
          tax_regime: string | null
          updated_at: string | null
        }
        Insert: {
          business_group?: string | null
          capital_social?: number | null
          churn_reason?: string | null
          city_state?: string | null
          client_since?: string | null
          cnae_main?: string | null
          cnae_secondary?: string[] | null
          cnpj?: string | null
          code?: string | null
          company_name?: string | null
          company_size?: string | null
          control_group?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          fiscal_closing_method?: string | null
          fiscal_responsible?: string | null
          health_score?: number | null
          id?: string
          last_contact?: string | null
          legal_nature?: string | null
          mrr?: number | null
          nickname?: string | null
          obligation_profile?: Json | null
          opening_date?: string | null
          personnel_closing_method?: string | null
          personnel_responsible?: string | null
          phone?: string | null
          segment?: string | null
          situation?: string | null
          state_registration?: string | null
          tax_regime?: string | null
          updated_at?: string | null
        }
        Update: {
          business_group?: string | null
          capital_social?: number | null
          churn_reason?: string | null
          city_state?: string | null
          client_since?: string | null
          cnae_main?: string | null
          cnae_secondary?: string[] | null
          cnpj?: string | null
          code?: string | null
          company_name?: string | null
          company_size?: string | null
          control_group?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          fiscal_closing_method?: string | null
          fiscal_responsible?: string | null
          health_score?: number | null
          id?: string
          last_contact?: string | null
          legal_nature?: string | null
          mrr?: number | null
          nickname?: string | null
          obligation_profile?: Json | null
          opening_date?: string | null
          personnel_closing_method?: string | null
          personnel_responsible?: string | null
          phone?: string | null
          segment?: string | null
          situation?: string | null
          state_registration?: string | null
          tax_regime?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      custom_exclusive_tools: {
        Row: {
          created_at: string | null
          description: string
          display_order: number
          icon: string
          id: string
          is_active: boolean
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      managed_cards: {
        Row: {
          card_type: string
          created_at: string | null
          description: string
          display_order: number
          icon: string
          id: string
          internal_path: string | null
          is_active: boolean
          open_type: string | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          card_type: string
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          internal_path?: string | null
          is_active?: boolean
          open_type?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          card_type?: string
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          internal_path?: string | null
          is_active?: boolean
          open_type?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      organization_settings: {
        Row: {
          id: number
          logo_url: string | null
          organization_name: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          logo_url?: string | null
          organization_name?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          logo_url?: string | null
          organization_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          item_description: string | null
          item_icon: string | null
          item_id: string
          item_name: string
          item_type: string
          item_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_description?: string | null
          item_icon?: string | null
          item_id: string
          item_name: string
          item_type: string
          item_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_description?: string | null
          item_icon?: string | null
          item_id?: string
          item_name?: string
          item_type?: string
          item_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_financial_access: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "viewer" | "director" | "employee" | "financial_staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "viewer", "director", "employee", "financial_staff"],
    },
  },
} as const
