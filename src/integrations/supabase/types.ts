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
      accounting_entries: {
        Row: {
          amount: number
          company_id: string
          created_at: string
          credit_account_code: string | null
          date: string
          debit_account_code: string | null
          description: string
          id: string
          is_reconciled: boolean
          operation: string | null
          status: string
        }
        Insert: {
          amount: number
          company_id: string
          created_at?: string
          credit_account_code?: string | null
          date: string
          debit_account_code?: string | null
          description: string
          id: string
          is_reconciled?: boolean
          operation?: string | null
          status?: string
        }
        Update: {
          amount?: number
          company_id?: string
          created_at?: string
          credit_account_code?: string | null
          date?: string
          debit_account_code?: string | null
          description?: string
          id?: string
          is_reconciled?: boolean
          operation?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      acumulador_tributario: {
        Row: {
          aliquota_cofins_entrada: number | null
          aliquota_cofins_saida: number | null
          aliquota_icms: number | null
          aliquota_ipi: number | null
          aliquota_pis_entrada: number | null
          aliquota_pis_saida: number | null
          base_credito: string | null
          config_opcao_id: string
          created_at: string | null
          cst_icms_entrada: string | null
          cst_icms_saida: string | null
          cst_ipi_entrada: string | null
          cst_ipi_saida: string | null
          cst_pis_cofins_entrada: string | null
          cst_pis_cofins_saida: string | null
          id: string
          natureza_receita: string | null
          sujeito_pis_cofins: string | null
          tipo_contribuicao: string | null
          tipo_tributacao_pis_cofins: string | null
          updated_at: string | null
          vinculo_credito: string | null
        }
        Insert: {
          aliquota_cofins_entrada?: number | null
          aliquota_cofins_saida?: number | null
          aliquota_icms?: number | null
          aliquota_ipi?: number | null
          aliquota_pis_entrada?: number | null
          aliquota_pis_saida?: number | null
          base_credito?: string | null
          config_opcao_id: string
          created_at?: string | null
          cst_icms_entrada?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_cofins_entrada?: string | null
          cst_pis_cofins_saida?: string | null
          id?: string
          natureza_receita?: string | null
          sujeito_pis_cofins?: string | null
          tipo_contribuicao?: string | null
          tipo_tributacao_pis_cofins?: string | null
          updated_at?: string | null
          vinculo_credito?: string | null
        }
        Update: {
          aliquota_cofins_entrada?: number | null
          aliquota_cofins_saida?: number | null
          aliquota_icms?: number | null
          aliquota_ipi?: number | null
          aliquota_pis_entrada?: number | null
          aliquota_pis_saida?: number | null
          base_credito?: string | null
          config_opcao_id?: string
          created_at?: string | null
          cst_icms_entrada?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_cofins_entrada?: string | null
          cst_pis_cofins_saida?: string | null
          id?: string
          natureza_receita?: string | null
          sujeito_pis_cofins?: string | null
          tipo_contribuicao?: string | null
          tipo_tributacao_pis_cofins?: string | null
          updated_at?: string | null
          vinculo_credito?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acumulador_tributario_config_opcao_id_fkey"
            columns: ["config_opcao_id"]
            isOneToOne: true
            referencedRelation: "config_opcoes"
            referencedColumns: ["id"]
          },
        ]
      }
      acumuladores: {
        Row: {
          acumulador: string
          codigo_produto: string
          created_at: string | null
          descricao: string | null
          empresa_id: string
          id: string
        }
        Insert: {
          acumulador: string
          codigo_produto: string
          created_at?: string | null
          descricao?: string | null
          empresa_id: string
          id?: string
        }
        Update: {
          acumulador?: string
          codigo_produto?: string
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string
          id?: string
        }
        Relationships: []
      }
      app_config: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          created_at: string | null
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_transactions: {
        Row: {
          amount: number
          bank_name: string | null
          company_id: string
          created_at: string
          date: string
          description: string
          id: string
          is_reconciled: boolean
          raw_line: string | null
          type: string
        }
        Insert: {
          amount: number
          bank_name?: string | null
          company_id: string
          created_at?: string
          date: string
          description: string
          id: string
          is_reconciled?: boolean
          raw_line?: string | null
          type: string
        }
        Update: {
          amount?: number
          bank_name?: string | null
          company_id?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          is_reconciled?: boolean
          raw_line?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_transactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cadastro_tributario: {
        Row: {
          acumulador_vinculado: string | null
          aliquota_cofins_entrada: number | null
          aliquota_cofins_saida: number | null
          aliquota_icms: number | null
          aliquota_ipi: number | null
          aliquota_pis_entrada: number | null
          aliquota_pis_saida: number | null
          base_credito: string | null
          cest: string | null
          codigo_produto: string | null
          created_at: string | null
          cst_icms_entrada: string | null
          cst_icms_saida: string | null
          cst_ipi_entrada: string | null
          cst_ipi_saida: string | null
          cst_pis_cofins_entrada: string | null
          cst_pis_cofins_saida: string | null
          descricao_produto: string | null
          ean: string | null
          grupo: string | null
          id: string
          natureza_receita: string | null
          nbs: string | null
          ncm: string | null
          sujeito_pis_cofins: string | null
          tipo_contribuicao: string | null
          tipo_tributacao_pis_cofins: string | null
          updated_at: string | null
          vinculo_credito: string | null
        }
        Insert: {
          acumulador_vinculado?: string | null
          aliquota_cofins_entrada?: number | null
          aliquota_cofins_saida?: number | null
          aliquota_icms?: number | null
          aliquota_ipi?: number | null
          aliquota_pis_entrada?: number | null
          aliquota_pis_saida?: number | null
          base_credito?: string | null
          cest?: string | null
          codigo_produto?: string | null
          created_at?: string | null
          cst_icms_entrada?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_cofins_entrada?: string | null
          cst_pis_cofins_saida?: string | null
          descricao_produto?: string | null
          ean?: string | null
          grupo?: string | null
          id?: string
          natureza_receita?: string | null
          nbs?: string | null
          ncm?: string | null
          sujeito_pis_cofins?: string | null
          tipo_contribuicao?: string | null
          tipo_tributacao_pis_cofins?: string | null
          updated_at?: string | null
          vinculo_credito?: string | null
        }
        Update: {
          acumulador_vinculado?: string | null
          aliquota_cofins_entrada?: number | null
          aliquota_cofins_saida?: number | null
          aliquota_icms?: number | null
          aliquota_ipi?: number | null
          aliquota_pis_entrada?: number | null
          aliquota_pis_saida?: number | null
          base_credito?: string | null
          cest?: string | null
          codigo_produto?: string | null
          created_at?: string | null
          cst_icms_entrada?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_cofins_entrada?: string | null
          cst_pis_cofins_saida?: string | null
          descricao_produto?: string | null
          ean?: string | null
          grupo?: string | null
          id?: string
          natureza_receita?: string | null
          nbs?: string | null
          ncm?: string | null
          sujeito_pis_cofins?: string | null
          tipo_contribuicao?: string | null
          tipo_tributacao_pis_cofins?: string | null
          updated_at?: string | null
          vinculo_credito?: string | null
        }
        Relationships: []
      }
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
      companies: {
        Row: {
          ai_guidelines: Json
          ai_learning_history: Json
          chart_of_accounts: Json
          cnpj: string | null
          created_at: string
          id: string
          industry: string | null
          name: string
          nickname: string | null
          rules: Json
        }
        Insert: {
          ai_guidelines?: Json
          ai_learning_history?: Json
          chart_of_accounts?: Json
          cnpj?: string | null
          created_at?: string
          id: string
          industry?: string | null
          name: string
          nickname?: string | null
          rules?: Json
        }
        Update: {
          ai_guidelines?: Json
          ai_learning_history?: Json
          chart_of_accounts?: Json
          cnpj?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          nickname?: string | null
          rules?: Json
        }
        Relationships: []
      }
      company: {
        Row: {
          cnpj: string
          created_at: string
          email: string | null
          endereco_bairro: string | null
          endereco_cep: string | null
          endereco_cidade: string | null
          endereco_complemento: string | null
          endereco_logradouro: string | null
          endereco_numero: string | null
          endereco_uf: string | null
          fap: number | null
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          logo_url: string | null
          nome_fantasia: string | null
          rat_percentage: number | null
          razao_social: string
          regime_tributario: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          cnpj: string
          created_at?: string
          email?: string | null
          endereco_bairro?: string | null
          endereco_cep?: string | null
          endereco_cidade?: string | null
          endereco_complemento?: string | null
          endereco_logradouro?: string | null
          endereco_numero?: string | null
          endereco_uf?: string | null
          fap?: number | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logo_url?: string | null
          nome_fantasia?: string | null
          rat_percentage?: number | null
          razao_social: string
          regime_tributario?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          cnpj?: string
          created_at?: string
          email?: string | null
          endereco_bairro?: string | null
          endereco_cep?: string | null
          endereco_cidade?: string | null
          endereco_complemento?: string | null
          endereco_logradouro?: string | null
          endereco_numero?: string | null
          endereco_uf?: string | null
          fap?: number | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logo_url?: string | null
          nome_fantasia?: string | null
          rat_percentage?: number | null
          razao_social?: string
          regime_tributario?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      config_opcoes: {
        Row: {
          ativo: boolean | null
          codigo: string | null
          created_at: string | null
          id: string
          nome: string
          tipo: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          codigo?: string | null
          created_at?: string | null
          id?: string
          nome: string
          tipo: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          codigo?: string | null
          created_at?: string | null
          id?: string
          nome?: string
          tipo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      correcoes_xml: {
        Row: {
          created_at: string
          divergencias_por_imposto: Json | null
          empresa_id: string
          exportado_em: string | null
          id: string
          impostograma_arquivo: string | null
          impostograma_formato: string | null
          nfe_arquivos: Json
          status: string
          total_correcoes_aprovadas: number | null
          total_divergencias: number | null
          total_matches: number | null
          total_nfe_itens: number | null
          usuario_id: string
        }
        Insert: {
          created_at?: string
          divergencias_por_imposto?: Json | null
          empresa_id: string
          exportado_em?: string | null
          id?: string
          impostograma_arquivo?: string | null
          impostograma_formato?: string | null
          nfe_arquivos?: Json
          status?: string
          total_correcoes_aprovadas?: number | null
          total_divergencias?: number | null
          total_matches?: number | null
          total_nfe_itens?: number | null
          usuario_id: string
        }
        Update: {
          created_at?: string
          divergencias_por_imposto?: Json | null
          empresa_id?: string
          exportado_em?: string | null
          id?: string
          impostograma_arquivo?: string | null
          impostograma_formato?: string | null
          nfe_arquivos?: Json
          status?: string
          total_correcoes_aprovadas?: number | null
          total_divergencias?: number | null
          total_matches?: number | null
          total_nfe_itens?: number | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "correcoes_xml_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
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
      departments: {
        Row: {
          active: boolean
          color: string
          cost_center_code: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: Database["public"]["Enums"]["department_slug"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          color?: string
          cost_center_code?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: Database["public"]["Enums"]["department_slug"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          color?: string
          cost_center_code?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: Database["public"]["Enums"]["department_slug"]
          updated_at?: string
        }
        Relationships: []
      }
      dependents: {
        Row: {
          cpf: string | null
          created_at: string
          data_nascimento: string | null
          employee_id: string
          id: string
          ir_deducao: boolean | null
          nome: string
          parentesco: string
          salario_familia: boolean | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string
          data_nascimento?: string | null
          employee_id: string
          id?: string
          ir_deducao?: boolean | null
          nome: string
          parentesco: string
          salario_familia?: boolean | null
        }
        Update: {
          cpf?: string | null
          created_at?: string
          data_nascimento?: string | null
          employee_id?: string
          id?: string
          ir_deducao?: boolean | null
          nome?: string
          parentesco?: string
          salario_familia?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "dependents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_recurring_discounts: {
        Row: {
          active: boolean
          created_at: string
          description: string
          employee_id: string
          end_month: number | null
          end_year: number | null
          id: string
          incide_inss: boolean
          incide_irrf: boolean
          notes: string | null
          parcelas_descontadas: number
          rubrica_code: string | null
          start_month: number
          start_year: number
          total_parcelas: number | null
          updated_at: string
          value: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          description: string
          employee_id: string
          end_month?: number | null
          end_year?: number | null
          id?: string
          incide_inss?: boolean
          incide_irrf?: boolean
          notes?: string | null
          parcelas_descontadas?: number
          rubrica_code?: string | null
          start_month: number
          start_year: number
          total_parcelas?: number | null
          updated_at?: string
          value: number
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          employee_id?: string
          end_month?: number | null
          end_year?: number | null
          id?: string
          incide_inss?: boolean
          incide_irrf?: boolean
          notes?: string | null
          parcelas_descontadas?: number
          rubrica_code?: string | null
          start_month?: number
          start_year?: number
          total_parcelas?: number | null
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "employee_recurring_discounts_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_recurring_discounts_rubrica_code_fkey"
            columns: ["rubrica_code"]
            isOneToOne: false
            referencedRelation: "rubrica_configs"
            referencedColumns: ["code"]
          },
        ]
      }
      employees: {
        Row: {
          adicional_funcao: number | null
          agencia: string | null
          banco_codigo: string | null
          banco_nome: string | null
          bonificacao: number | null
          celular: string | null
          certificado_reservista: string | null
          conta: string | null
          contato_emergencia_nome: string | null
          contato_emergencia_telefone: string | null
          cpf: string
          created_at: string
          ctps_numero: string | null
          ctps_serie: string | null
          ctps_uf: string | null
          data_admissao: string
          data_demissao: string | null
          data_nascimento: string | null
          department_id: string | null
          email: string | null
          endereco_bairro: string | null
          endereco_cep: string | null
          endereco_cidade: string | null
          endereco_complemento: string | null
          endereco_logradouro: string | null
          endereco_numero: string | null
          endereco_uf: string | null
          estado_civil: string | null
          foto_url: string | null
          gratificacao: number | null
          gratificacao_incorporada: number | null
          horario_trabalho: string | null
          id: string
          insalubridade_grau: string | null
          isento_inss: boolean
          isento_irrf: boolean
          jornada_semanal: number | null
          matricula: string | null
          nacionalidade: string | null
          nome_completo: string
          nome_mae: string | null
          nome_pai: string | null
          numero_dependentes: number | null
          observacoes: string | null
          pensao_alimenticia: boolean | null
          pensao_percentual: number | null
          pensao_valor_fixo: number | null
          periculosidade: boolean | null
          pis_pasep: string | null
          pix_chave: string | null
          plano_odontologico: boolean | null
          plano_odontologico_desconto: number | null
          plano_saude: boolean | null
          plano_saude_desconto: number | null
          position_id: string | null
          premiacao: number | null
          rg: string | null
          rg_orgao_emissor: string | null
          rg_uf: string | null
          salario_base: number
          sexo: string | null
          status: string
          telefone: string | null
          tipo_conta: string | null
          tipo_contrato: string
          tipo_salario: string | null
          titulo_eleitor: string | null
          updated_at: string
          va_valor_mensal: number | null
          vale_alimentacao: boolean | null
          vale_refeicao: boolean | null
          vale_transporte: boolean | null
          vr_valor_diario: number | null
          vt_valor_diario: number | null
        }
        Insert: {
          adicional_funcao?: number | null
          agencia?: string | null
          banco_codigo?: string | null
          banco_nome?: string | null
          bonificacao?: number | null
          celular?: string | null
          certificado_reservista?: string | null
          conta?: string | null
          contato_emergencia_nome?: string | null
          contato_emergencia_telefone?: string | null
          cpf: string
          created_at?: string
          ctps_numero?: string | null
          ctps_serie?: string | null
          ctps_uf?: string | null
          data_admissao: string
          data_demissao?: string | null
          data_nascimento?: string | null
          department_id?: string | null
          email?: string | null
          endereco_bairro?: string | null
          endereco_cep?: string | null
          endereco_cidade?: string | null
          endereco_complemento?: string | null
          endereco_logradouro?: string | null
          endereco_numero?: string | null
          endereco_uf?: string | null
          estado_civil?: string | null
          foto_url?: string | null
          gratificacao?: number | null
          gratificacao_incorporada?: number | null
          horario_trabalho?: string | null
          id?: string
          insalubridade_grau?: string | null
          isento_inss?: boolean
          isento_irrf?: boolean
          jornada_semanal?: number | null
          matricula?: string | null
          nacionalidade?: string | null
          nome_completo: string
          nome_mae?: string | null
          nome_pai?: string | null
          numero_dependentes?: number | null
          observacoes?: string | null
          pensao_alimenticia?: boolean | null
          pensao_percentual?: number | null
          pensao_valor_fixo?: number | null
          periculosidade?: boolean | null
          pis_pasep?: string | null
          pix_chave?: string | null
          plano_odontologico?: boolean | null
          plano_odontologico_desconto?: number | null
          plano_saude?: boolean | null
          plano_saude_desconto?: number | null
          position_id?: string | null
          premiacao?: number | null
          rg?: string | null
          rg_orgao_emissor?: string | null
          rg_uf?: string | null
          salario_base: number
          sexo?: string | null
          status?: string
          telefone?: string | null
          tipo_conta?: string | null
          tipo_contrato?: string
          tipo_salario?: string | null
          titulo_eleitor?: string | null
          updated_at?: string
          va_valor_mensal?: number | null
          vale_alimentacao?: boolean | null
          vale_refeicao?: boolean | null
          vale_transporte?: boolean | null
          vr_valor_diario?: number | null
          vt_valor_diario?: number | null
        }
        Update: {
          adicional_funcao?: number | null
          agencia?: string | null
          banco_codigo?: string | null
          banco_nome?: string | null
          bonificacao?: number | null
          celular?: string | null
          certificado_reservista?: string | null
          conta?: string | null
          contato_emergencia_nome?: string | null
          contato_emergencia_telefone?: string | null
          cpf?: string
          created_at?: string
          ctps_numero?: string | null
          ctps_serie?: string | null
          ctps_uf?: string | null
          data_admissao?: string
          data_demissao?: string | null
          data_nascimento?: string | null
          department_id?: string | null
          email?: string | null
          endereco_bairro?: string | null
          endereco_cep?: string | null
          endereco_cidade?: string | null
          endereco_complemento?: string | null
          endereco_logradouro?: string | null
          endereco_numero?: string | null
          endereco_uf?: string | null
          estado_civil?: string | null
          foto_url?: string | null
          gratificacao?: number | null
          gratificacao_incorporada?: number | null
          horario_trabalho?: string | null
          id?: string
          insalubridade_grau?: string | null
          isento_inss?: boolean
          isento_irrf?: boolean
          jornada_semanal?: number | null
          matricula?: string | null
          nacionalidade?: string | null
          nome_completo?: string
          nome_mae?: string | null
          nome_pai?: string | null
          numero_dependentes?: number | null
          observacoes?: string | null
          pensao_alimenticia?: boolean | null
          pensao_percentual?: number | null
          pensao_valor_fixo?: number | null
          periculosidade?: boolean | null
          pis_pasep?: string | null
          pix_chave?: string | null
          plano_odontologico?: boolean | null
          plano_odontologico_desconto?: number | null
          plano_saude?: boolean | null
          plano_saude_desconto?: number | null
          position_id?: string | null
          premiacao?: number | null
          rg?: string | null
          rg_orgao_emissor?: string | null
          rg_uf?: string | null
          salario_base?: number
          sexo?: string | null
          status?: string
          telefone?: string | null
          tipo_conta?: string | null
          tipo_contrato?: string
          tipo_salario?: string | null
          titulo_eleitor?: string | null
          updated_at?: string
          va_valor_mensal?: number | null
          vale_alimentacao?: boolean | null
          vale_refeicao?: boolean | null
          vale_transporte?: boolean | null
          vr_valor_diario?: number | null
          vt_valor_diario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          ativa: boolean | null
          cnpj: string
          created_at: string | null
          created_by: string | null
          id: string
          inscricao_estadual: string | null
          nome_fantasia: string | null
          razao_social: string
          regime_tributario: string | null
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean | null
          cnpj: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social: string
          regime_tributario?: string | null
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean | null
          cnpj?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social?: string
          regime_tributario?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fiscal_apuracao_entries: {
        Row: {
          acumulador_codigo: string | null
          acumulador_descricao: string | null
          aliq_cofins: number | null
          aliq_icms: number | null
          aliq_pis: number | null
          base_cofins: number | null
          base_icms: number | null
          base_pis: number | null
          cfop: string | null
          cnpj: string | null
          company_id: string
          competence_month: number
          competence_year: number
          created_at: string | null
          cst_cofins: string | null
          cst_icms: string | null
          cst_pis: string | null
          file_type: string
          id: string
          import_batch_id: string
          ncm: string | null
          nf_date: string | null
          nf_number: string | null
          produto_codigo: string | null
          produto_descricao: string | null
          quantidade: number | null
          tenant_id: string
          tipo: string
          v_cred_cofins: boolean | null
          v_cred_pis: boolean | null
          valor_cofins: number | null
          valor_icms: number | null
          valor_icms_st: number | null
          valor_ipi: number | null
          valor_pis: number | null
          valor_produto: number | null
          valor_unitario: number | null
        }
        Insert: {
          acumulador_codigo?: string | null
          acumulador_descricao?: string | null
          aliq_cofins?: number | null
          aliq_icms?: number | null
          aliq_pis?: number | null
          base_cofins?: number | null
          base_icms?: number | null
          base_pis?: number | null
          cfop?: string | null
          cnpj?: string | null
          company_id: string
          competence_month: number
          competence_year: number
          created_at?: string | null
          cst_cofins?: string | null
          cst_icms?: string | null
          cst_pis?: string | null
          file_type?: string
          id?: string
          import_batch_id: string
          ncm?: string | null
          nf_date?: string | null
          nf_number?: string | null
          produto_codigo?: string | null
          produto_descricao?: string | null
          quantidade?: number | null
          tenant_id: string
          tipo: string
          v_cred_cofins?: boolean | null
          v_cred_pis?: boolean | null
          valor_cofins?: number | null
          valor_icms?: number | null
          valor_icms_st?: number | null
          valor_ipi?: number | null
          valor_pis?: number | null
          valor_produto?: number | null
          valor_unitario?: number | null
        }
        Update: {
          acumulador_codigo?: string | null
          acumulador_descricao?: string | null
          aliq_cofins?: number | null
          aliq_icms?: number | null
          aliq_pis?: number | null
          base_cofins?: number | null
          base_icms?: number | null
          base_pis?: number | null
          cfop?: string | null
          cnpj?: string | null
          company_id?: string
          competence_month?: number
          competence_year?: number
          created_at?: string | null
          cst_cofins?: string | null
          cst_icms?: string | null
          cst_pis?: string | null
          file_type?: string
          id?: string
          import_batch_id?: string
          ncm?: string | null
          nf_date?: string | null
          nf_number?: string | null
          produto_codigo?: string | null
          produto_descricao?: string | null
          quantidade?: number | null
          tenant_id?: string
          tipo?: string
          v_cred_cofins?: boolean | null
          v_cred_pis?: boolean | null
          valor_cofins?: number | null
          valor_icms?: number | null
          valor_icms_st?: number | null
          valor_ipi?: number | null
          valor_pis?: number | null
          valor_produto?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fiscal_apuracao_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      fiscal_apuracao_import_logs: {
        Row: {
          batch_id: string
          company_id: string
          competence_month: number
          competence_year: number
          created_at: string | null
          file_name: string | null
          file_type: string | null
          id: string
          imported_rows: number | null
          skipped_rows: number | null
          status: string
          tenant_id: string
          total_rows: number | null
        }
        Insert: {
          batch_id: string
          company_id: string
          competence_month: number
          competence_year: number
          created_at?: string | null
          file_name?: string | null
          file_type?: string | null
          id?: string
          imported_rows?: number | null
          skipped_rows?: number | null
          status?: string
          tenant_id: string
          total_rows?: number | null
        }
        Update: {
          batch_id?: string
          company_id?: string
          competence_month?: number
          competence_year?: number
          created_at?: string | null
          file_name?: string | null
          file_type?: string | null
          id?: string
          imported_rows?: number | null
          skipped_rows?: number | null
          status?: string
          tenant_id?: string
          total_rows?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fiscal_apuracao_import_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      fiscal_entries: {
        Row: {
          acumulador: string | null
          aliq_cofins: number | null
          aliq_icms: number | null
          aliq_ipi: number | null
          aliq_pis: number | null
          base_cofins: number | null
          base_icms: number | null
          base_pis: number | null
          cfop: string | null
          company_id: string
          competencia: string | null
          created_at: string
          cst_cofins: string | null
          cst_icms: string | null
          cst_pis: string | null
          date: string
          document_number: string | null
          id: string
          movement_type: string
          ncm: string | null
          product_code: string | null
          product_description: string | null
          product_value: number
          quantity: number | null
          situacao: string | null
          spreadsheet_type: string
          unit_value: number | null
          valor_cofins: number | null
          valor_icms: number | null
          valor_ipi: number | null
          valor_pis: number | null
        }
        Insert: {
          acumulador?: string | null
          aliq_cofins?: number | null
          aliq_icms?: number | null
          aliq_ipi?: number | null
          aliq_pis?: number | null
          base_cofins?: number | null
          base_icms?: number | null
          base_pis?: number | null
          cfop?: string | null
          company_id: string
          competencia?: string | null
          created_at?: string
          cst_cofins?: string | null
          cst_icms?: string | null
          cst_pis?: string | null
          date?: string
          document_number?: string | null
          id?: string
          movement_type: string
          ncm?: string | null
          product_code?: string | null
          product_description?: string | null
          product_value?: number
          quantity?: number | null
          situacao?: string | null
          spreadsheet_type: string
          unit_value?: number | null
          valor_cofins?: number | null
          valor_icms?: number | null
          valor_ipi?: number | null
          valor_pis?: number | null
        }
        Update: {
          acumulador?: string | null
          aliq_cofins?: number | null
          aliq_icms?: number | null
          aliq_ipi?: number | null
          aliq_pis?: number | null
          base_cofins?: number | null
          base_icms?: number | null
          base_pis?: number | null
          cfop?: string | null
          company_id?: string
          competencia?: string | null
          created_at?: string
          cst_cofins?: string | null
          cst_icms?: string | null
          cst_pis?: string | null
          date?: string
          document_number?: string | null
          id?: string
          movement_type?: string
          ncm?: string | null
          product_code?: string | null
          product_description?: string | null
          product_value?: number
          quantity?: number | null
          situacao?: string | null
          spreadsheet_type?: string
          unit_value?: number | null
          valor_cofins?: number | null
          valor_icms?: number | null
          valor_ipi?: number | null
          valor_pis?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fiscal_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      fiscal_fechamento_simulacoes: {
        Row: {
          company_id: string
          competence_month: number
          competence_year: number
          created_at: string | null
          dre_values: Json
          fiscal_values: Json
          id: string
          name: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          competence_month: number
          competence_year: number
          created_at?: string | null
          dre_values?: Json
          fiscal_values?: Json
          id?: string
          name?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          competence_month?: number
          competence_year?: number
          created_at?: string | null
          dre_values?: Json
          fiscal_values?: Json
          id?: string
          name?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fiscal_fechamento_simulacoes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      gf_clients: {
        Row: {
          address: string | null
          city: string | null
          cnpj: string | null
          company_id: string
          created_at: string | null
          id: string
          name: string
          phone: string | null
          state: string | null
          state_registration: string | null
          user_id: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          company_id: string
          created_at?: string | null
          id?: string
          name: string
          phone?: string | null
          state?: string | null
          state_registration?: string | null
          user_id: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          company_id?: string
          created_at?: string | null
          id?: string
          name?: string
          phone?: string | null
          state?: string | null
          state_registration?: string | null
          user_id?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gf_clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "gf_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      gf_companies: {
        Row: {
          address: string | null
          bank_accounts: Json
          city: string | null
          cnpj: string
          config: Json | null
          created_at: string | null
          current_invoice_number: number | null
          default_additional_data: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          state: string | null
          state_registration: string | null
          trade_name: string | null
          user_id: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          bank_accounts?: Json
          city?: string | null
          cnpj: string
          config?: Json | null
          created_at?: string | null
          current_invoice_number?: number | null
          default_additional_data?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          state?: string | null
          state_registration?: string | null
          trade_name?: string | null
          user_id: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          bank_accounts?: Json
          city?: string | null
          cnpj?: string
          config?: Json | null
          created_at?: string | null
          current_invoice_number?: number | null
          default_additional_data?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          state?: string | null
          state_registration?: string | null
          trade_name?: string | null
          user_id?: string
          zip?: string | null
        }
        Relationships: []
      }
      gf_invoice_items: {
        Row: {
          description: string
          id: string
          invoice_id: string
          quantity: number
          total_price: number
          unit: string | null
          unit_price: number
        }
        Insert: {
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          total_price?: number
          unit?: string | null
          unit_price?: number
        }
        Update: {
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          total_price?: number
          unit?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "gf_invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "gf_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      gf_invoices: {
        Row: {
          additional_data: string | null
          bank_account: Json | null
          client_id: string
          company_id: string
          created_at: string | null
          due_date: string
          id: string
          installments: Json
          invoice_number: number
          issue_date: string
          lease_id: string | null
          num_installments: number
          payment_condition: string
          payment_method: string | null
          status: string
          total_value: number
          user_id: string
          value_in_words: string | null
        }
        Insert: {
          additional_data?: string | null
          bank_account?: Json | null
          client_id: string
          company_id: string
          created_at?: string | null
          due_date: string
          id?: string
          installments?: Json
          invoice_number: number
          issue_date: string
          lease_id?: string | null
          num_installments?: number
          payment_condition?: string
          payment_method?: string | null
          status?: string
          total_value?: number
          user_id: string
          value_in_words?: string | null
        }
        Update: {
          additional_data?: string | null
          bank_account?: Json | null
          client_id?: string
          company_id?: string
          created_at?: string | null
          due_date?: string
          id?: string
          installments?: Json
          invoice_number?: number
          issue_date?: string
          lease_id?: string | null
          num_installments?: number
          payment_condition?: string
          payment_method?: string | null
          status?: string
          total_value?: number
          user_id?: string
          value_in_words?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gf_invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "gf_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gf_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "gf_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gf_invoices_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "gf_leases"
            referencedColumns: ["id"]
          },
        ]
      }
      gf_leases: {
        Row: {
          client_id: string
          company_id: string
          created_at: string | null
          end_date: string
          id: string
          property_id: string
          start_date: string
          status: string | null
          user_id: string
          value: number
        }
        Insert: {
          client_id: string
          company_id: string
          created_at?: string | null
          end_date: string
          id?: string
          property_id: string
          start_date: string
          status?: string | null
          user_id: string
          value?: number
        }
        Update: {
          client_id?: string
          company_id?: string
          created_at?: string | null
          end_date?: string
          id?: string
          property_id?: string
          start_date?: string
          status?: string | null
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "gf_leases_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "gf_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gf_leases_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "gf_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gf_leases_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "gf_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      gf_properties: {
        Row: {
          address: string | null
          company_id: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          type: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          address?: string | null
          company_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          address?: string | null
          company_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gf_properties_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "gf_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      grupos_fiscais: {
        Row: {
          aliq_cofins_entrada: number | null
          aliq_cofins_saida: number | null
          aliq_icms: number | null
          aliq_ipi: number | null
          aliq_pis_entrada: number | null
          aliq_pis_saida: number | null
          base_credito: string | null
          chave_grupo: string
          created_at: string | null
          cst_cofins_saida: string | null
          cst_icms_saida: string | null
          cst_ipi_entrada: string | null
          cst_ipi_saida: string | null
          cst_pis_entrada: string | null
          cst_pis_saida: string
          descricao: string
          empresa_id: string
          id: string
          importacao_id: string
          nat_rec_pis: string | null
          ordem: number | null
          selecionado: boolean | null
          sujeito_pis_cofins: string | null
          tipo_pis_cofins: string | null
          tipo_tributacao: string | null
          vinculo_credito: string | null
        }
        Insert: {
          aliq_cofins_entrada?: number | null
          aliq_cofins_saida?: number | null
          aliq_icms?: number | null
          aliq_ipi?: number | null
          aliq_pis_entrada?: number | null
          aliq_pis_saida?: number | null
          base_credito?: string | null
          chave_grupo: string
          created_at?: string | null
          cst_cofins_saida?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_entrada?: string | null
          cst_pis_saida: string
          descricao: string
          empresa_id: string
          id?: string
          importacao_id: string
          nat_rec_pis?: string | null
          ordem?: number | null
          selecionado?: boolean | null
          sujeito_pis_cofins?: string | null
          tipo_pis_cofins?: string | null
          tipo_tributacao?: string | null
          vinculo_credito?: string | null
        }
        Update: {
          aliq_cofins_entrada?: number | null
          aliq_cofins_saida?: number | null
          aliq_icms?: number | null
          aliq_ipi?: number | null
          aliq_pis_entrada?: number | null
          aliq_pis_saida?: number | null
          base_credito?: string | null
          chave_grupo?: string
          created_at?: string | null
          cst_cofins_saida?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_entrada?: string | null
          cst_pis_saida?: string
          descricao?: string
          empresa_id?: string
          id?: string
          importacao_id?: string
          nat_rec_pis?: string | null
          ordem?: number | null
          selecionado?: boolean | null
          sujeito_pis_cofins?: string | null
          tipo_pis_cofins?: string | null
          tipo_tributacao?: string | null
          vinculo_credito?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupos_fiscais_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grupos_fiscais_importacao_id_fkey"
            columns: ["importacao_id"]
            isOneToOne: false
            referencedRelation: "importacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      importacoes: {
        Row: {
          created_at: string | null
          csv_gerado_em: string | null
          descricao_vigencia: string | null
          empresa_id: string
          id: string
          metadados: Json | null
          nome_arquivo: string
          status: string | null
          tamanho_arquivo: number | null
          total_duplicados_removidos: number | null
          total_grupos: number | null
          total_ncms: number | null
          total_ncms_exportados: number | null
          updated_at: string | null
          usuario_id: string
          vigencia: string | null
        }
        Insert: {
          created_at?: string | null
          csv_gerado_em?: string | null
          descricao_vigencia?: string | null
          empresa_id: string
          id?: string
          metadados?: Json | null
          nome_arquivo: string
          status?: string | null
          tamanho_arquivo?: number | null
          total_duplicados_removidos?: number | null
          total_grupos?: number | null
          total_ncms?: number | null
          total_ncms_exportados?: number | null
          updated_at?: string | null
          usuario_id: string
          vigencia?: string | null
        }
        Update: {
          created_at?: string | null
          csv_gerado_em?: string | null
          descricao_vigencia?: string | null
          empresa_id?: string
          id?: string
          metadados?: Json | null
          nome_arquivo?: string
          status?: string | null
          tamanho_arquivo?: number | null
          total_duplicados_removidos?: number | null
          total_grupos?: number | null
          total_ncms?: number | null
          total_ncms_exportados?: number | null
          updated_at?: string | null
          usuario_id?: string
          vigencia?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "importacoes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      importacoes_notas: {
        Row: {
          created_at: string | null
          empresa_id: string
          id: string
          nome: string | null
          qtd_itens: number | null
          qtd_notas: number | null
          status: string | null
          tipo: string
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          created_at?: string | null
          empresa_id: string
          id?: string
          nome?: string | null
          qtd_itens?: number | null
          qtd_notas?: number | null
          status?: string | null
          tipo: string
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          created_at?: string | null
          empresa_id?: string
          id?: string
          nome?: string | null
          qtd_itens?: number | null
          qtd_notas?: number | null
          status?: string | null
          tipo?: string
          updated_at?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "importacoes_notas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      inss_tax_brackets: {
        Row: {
          bracket_order: number
          created_at: string
          deduction: number | null
          id: string
          max_value: number
          min_value: number
          rate: number
          valid_from: string
          valid_until: string | null
          year: number
        }
        Insert: {
          bracket_order: number
          created_at?: string
          deduction?: number | null
          id?: string
          max_value: number
          min_value: number
          rate: number
          valid_from: string
          valid_until?: string | null
          year: number
        }
        Update: {
          bracket_order?: number
          created_at?: string
          deduction?: number | null
          id?: string
          max_value?: number
          min_value?: number
          rate?: number
          valid_from?: string
          valid_until?: string | null
          year?: number
        }
        Relationships: []
      }
      irrf_deduction_values: {
        Row: {
          created_at: string
          deduction_per_dependent: number
          id: string
          simplified_deduction: number
          valid_from: string
          valid_until: string | null
          year: number
        }
        Insert: {
          created_at?: string
          deduction_per_dependent: number
          id?: string
          simplified_deduction?: number
          valid_from: string
          valid_until?: string | null
          year: number
        }
        Update: {
          created_at?: string
          deduction_per_dependent?: number
          id?: string
          simplified_deduction?: number
          valid_from?: string
          valid_until?: string | null
          year?: number
        }
        Relationships: []
      }
      irrf_tax_brackets: {
        Row: {
          bracket_order: number
          created_at: string
          deduction: number
          id: string
          max_value: number | null
          min_value: number
          rate: number
          valid_from: string
          valid_until: string | null
          year: number
        }
        Insert: {
          bracket_order: number
          created_at?: string
          deduction?: number
          id?: string
          max_value?: number | null
          min_value: number
          rate: number
          valid_from: string
          valid_until?: string | null
          year: number
        }
        Update: {
          bracket_order?: number
          created_at?: string
          deduction?: number
          id?: string
          max_value?: number | null
          min_value?: number
          rate?: number
          valid_from?: string
          valid_until?: string | null
          year?: number
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
      mapeamentos_colunas_imp: {
        Row: {
          colunas_origem: string[] | null
          created_at: string | null
          empresa_id: string
          id: string
          mapa_colunas: Json
          updated_at: string | null
        }
        Insert: {
          colunas_origem?: string[] | null
          created_at?: string | null
          empresa_id: string
          id?: string
          mapa_colunas?: Json
          updated_at?: string | null
        }
        Update: {
          colunas_origem?: string[] | null
          created_at?: string | null
          empresa_id?: string
          id?: string
          mapa_colunas?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mapeamentos_colunas_imp_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      mapeamentos_xml: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          empresa_id: string
          id: string
          impostograma_campos_disponiveis: Json | null
          nfe_campos_disponiveis: Json | null
          nome: string
          regras_comparacao: Json | null
          regras_matching: Json | null
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id: string
          id?: string
          impostograma_campos_disponiveis?: Json | null
          nfe_campos_disponiveis?: Json | null
          nome: string
          regras_comparacao?: Json | null
          regras_matching?: Json | null
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id?: string
          id?: string
          impostograma_campos_disponiveis?: Json | null
          nfe_campos_disponiveis?: Json | null
          nome?: string
          regras_comparacao?: Json | null
          regras_matching?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mapeamentos_xml_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ncms: {
        Row: {
          cest: string | null
          created_at: string | null
          descricao_produto: string | null
          empresa_id: string
          grupo_fiscal_id: string
          id: string
          ncm: string
        }
        Insert: {
          cest?: string | null
          created_at?: string | null
          descricao_produto?: string | null
          empresa_id: string
          grupo_fiscal_id: string
          id?: string
          ncm: string
        }
        Update: {
          cest?: string | null
          created_at?: string | null
          descricao_produto?: string | null
          empresa_id?: string
          grupo_fiscal_id?: string
          id?: string
          ncm?: string
        }
        Relationships: [
          {
            foreignKeyName: "ncms_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ncms_grupo_fiscal_id_fkey"
            columns: ["grupo_fiscal_id"]
            isOneToOne: false
            referencedRelation: "grupos_fiscais"
            referencedColumns: ["id"]
          },
        ]
      }
      notas_linhas: {
        Row: {
          acumulador: number | null
          aliquota_cofins: number | null
          aliquota_icms: number | null
          aliquota_ipi: number | null
          aliquota_pis: number | null
          base_calculo_icms: number | null
          base_calculo_ipi: number | null
          base_calculo_pis_cofins: number | null
          cfop: string | null
          codigo_item: string | null
          cpf_cnpj: string | null
          created_at: string | null
          cst_pis_cofins: string | null
          data: string | null
          divergencias: Json | null
          ean_original: string | null
          endereco: string | null
          id: string
          importacao_id: string
          isentas_icms: number | null
          isentas_ipi: number | null
          municipio: string | null
          ncm_original: string | null
          numero_documento: string | null
          ordem: number
          outras_icms: number | null
          outras_ipi: number | null
          quantidade: number | null
          razao_social: string | null
          serie: string | null
          situacao: number | null
          uf: string | null
          valor_cofins: number | null
          valor_contabil: number | null
          valor_descontos: number | null
          valor_icms: number | null
          valor_ipi: number | null
          valor_pis: number | null
          valor_produtos: number | null
          valor_unitario: number | null
        }
        Insert: {
          acumulador?: number | null
          aliquota_cofins?: number | null
          aliquota_icms?: number | null
          aliquota_ipi?: number | null
          aliquota_pis?: number | null
          base_calculo_icms?: number | null
          base_calculo_ipi?: number | null
          base_calculo_pis_cofins?: number | null
          cfop?: string | null
          codigo_item?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          cst_pis_cofins?: string | null
          data?: string | null
          divergencias?: Json | null
          ean_original?: string | null
          endereco?: string | null
          id?: string
          importacao_id: string
          isentas_icms?: number | null
          isentas_ipi?: number | null
          municipio?: string | null
          ncm_original?: string | null
          numero_documento?: string | null
          ordem: number
          outras_icms?: number | null
          outras_ipi?: number | null
          quantidade?: number | null
          razao_social?: string | null
          serie?: string | null
          situacao?: number | null
          uf?: string | null
          valor_cofins?: number | null
          valor_contabil?: number | null
          valor_descontos?: number | null
          valor_icms?: number | null
          valor_ipi?: number | null
          valor_pis?: number | null
          valor_produtos?: number | null
          valor_unitario?: number | null
        }
        Update: {
          acumulador?: number | null
          aliquota_cofins?: number | null
          aliquota_icms?: number | null
          aliquota_ipi?: number | null
          aliquota_pis?: number | null
          base_calculo_icms?: number | null
          base_calculo_ipi?: number | null
          base_calculo_pis_cofins?: number | null
          cfop?: string | null
          codigo_item?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          cst_pis_cofins?: string | null
          data?: string | null
          divergencias?: Json | null
          ean_original?: string | null
          endereco?: string | null
          id?: string
          importacao_id?: string
          isentas_icms?: number | null
          isentas_ipi?: number | null
          municipio?: string | null
          ncm_original?: string | null
          numero_documento?: string | null
          ordem?: number
          outras_icms?: number | null
          outras_ipi?: number | null
          quantidade?: number | null
          razao_social?: string | null
          serie?: string | null
          situacao?: number | null
          uf?: string | null
          valor_cofins?: number | null
          valor_contabil?: number | null
          valor_descontos?: number | null
          valor_icms?: number | null
          valor_ipi?: number | null
          valor_pis?: number | null
          valor_produtos?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notas_linhas_importacao_id_fkey"
            columns: ["importacao_id"]
            isOneToOne: false
            referencedRelation: "importacoes_notas"
            referencedColumns: ["id"]
          },
        ]
      }
      notas_servico: {
        Row: {
          chave_acesso: string | null
          codigo_servico: string | null
          created_at: string | null
          data_competencia: string
          data_emissao: string
          descricao_servico: string
          id: string
          iss_aliquota: number | null
          iss_valor: number | null
          nfse_numero: string
          nfse_serie: string | null
          prestador_cnpj: string
          prestador_nome: string
          tomador_cnpj: string | null
          tomador_nome: string
          updated_at: string | null
          valor_servico: number
          xml_filename: string | null
        }
        Insert: {
          chave_acesso?: string | null
          codigo_servico?: string | null
          created_at?: string | null
          data_competencia: string
          data_emissao: string
          descricao_servico: string
          id?: string
          iss_aliquota?: number | null
          iss_valor?: number | null
          nfse_numero: string
          nfse_serie?: string | null
          prestador_cnpj: string
          prestador_nome: string
          tomador_cnpj?: string | null
          tomador_nome: string
          updated_at?: string | null
          valor_servico?: number
          xml_filename?: string | null
        }
        Update: {
          chave_acesso?: string | null
          codigo_servico?: string | null
          created_at?: string | null
          data_competencia?: string
          data_emissao?: string
          descricao_servico?: string
          id?: string
          iss_aliquota?: number | null
          iss_valor?: number | null
          nfse_numero?: string
          nfse_serie?: string | null
          prestador_cnpj?: string
          prestador_nome?: string
          tomador_cnpj?: string | null
          tomador_nome?: string
          updated_at?: string | null
          valor_servico?: number
          xml_filename?: string | null
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
      payroll_entries: {
        Row: {
          base_fgts: number | null
          base_inss: number | null
          base_irrf: number | null
          created_at: string
          department_name: string | null
          dias_faltas: number | null
          dias_trabalhados: number | null
          dias_uteis: number | null
          employee_id: string
          horas_atrasos: number | null
          horas_extras_100: number | null
          horas_extras_50: number | null
          horas_normais: number | null
          horas_noturnas: number | null
          id: string
          paid_at: string | null
          payroll_period_id: string
          position_title: string | null
          salario_base: number
          salario_liquido: number
          status: string
          total_descontos: number
          total_proventos: number
          updated_at: string
          valor_fgts: number | null
          valor_inss: number | null
          valor_irrf: number | null
        }
        Insert: {
          base_fgts?: number | null
          base_inss?: number | null
          base_irrf?: number | null
          created_at?: string
          department_name?: string | null
          dias_faltas?: number | null
          dias_trabalhados?: number | null
          dias_uteis?: number | null
          employee_id: string
          horas_atrasos?: number | null
          horas_extras_100?: number | null
          horas_extras_50?: number | null
          horas_normais?: number | null
          horas_noturnas?: number | null
          id?: string
          paid_at?: string | null
          payroll_period_id: string
          position_title?: string | null
          salario_base: number
          salario_liquido?: number
          status?: string
          total_descontos?: number
          total_proventos?: number
          updated_at?: string
          valor_fgts?: number | null
          valor_inss?: number | null
          valor_irrf?: number | null
        }
        Update: {
          base_fgts?: number | null
          base_inss?: number | null
          base_irrf?: number | null
          created_at?: string
          department_name?: string | null
          dias_faltas?: number | null
          dias_trabalhados?: number | null
          dias_uteis?: number | null
          employee_id?: string
          horas_atrasos?: number | null
          horas_extras_100?: number | null
          horas_extras_50?: number | null
          horas_normais?: number | null
          horas_noturnas?: number | null
          id?: string
          paid_at?: string | null
          payroll_period_id?: string
          position_title?: string | null
          salario_base?: number
          salario_liquido?: number
          status?: string
          total_descontos?: number
          total_proventos?: number
          updated_at?: string
          valor_fgts?: number | null
          valor_inss?: number | null
          valor_irrf?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_entries_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_entries_payroll_period_id_fkey"
            columns: ["payroll_period_id"]
            isOneToOne: false
            referencedRelation: "payroll_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_entry_items: {
        Row: {
          code: string
          created_at: string
          description: string
          id: string
          incide_inss: boolean
          incide_irrf: boolean
          is_manual: boolean
          payroll_entry_id: string
          reference_value: string | null
          sort_order: number | null
          type: string
          value: number
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          id?: string
          incide_inss?: boolean
          incide_irrf?: boolean
          is_manual?: boolean
          payroll_entry_id: string
          reference_value?: string | null
          sort_order?: number | null
          type: string
          value: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          id?: string
          incide_inss?: boolean
          incide_irrf?: boolean
          is_manual?: boolean
          payroll_entry_id?: string
          reference_value?: string | null
          sort_order?: number | null
          type?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "payroll_entry_items_payroll_entry_id_fkey"
            columns: ["payroll_entry_id"]
            isOneToOne: false
            referencedRelation: "payroll_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_periods: {
        Row: {
          calculated_at: string | null
          closed_at: string | null
          closed_by: string | null
          created_at: string
          id: string
          notes: string | null
          reference_month: number
          reference_year: number
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          calculated_at?: string | null
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          reference_month: number
          reference_year: number
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          calculated_at?: string | null
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          reference_month?: number
          reference_year?: number
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_periods_closed_by_fkey"
            columns: ["closed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          nome_completo: string | null
          ultima_empresa_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          nome_completo?: string | null
          ultima_empresa_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          nome_completo?: string | null
          ultima_empresa_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "perfis_ultima_empresa_fk"
            columns: ["ultima_empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      positions: {
        Row: {
          active: boolean
          cbo_code: string | null
          created_at: string
          department_id: string | null
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          cbo_code?: string | null
          created_at?: string
          department_id?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          cbo_code?: string | null
          created_at?: string
          department_id?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      produto_mapeamento: {
        Row: {
          cadastro_id: string
          chave_tipo: string
          chave_valor: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          cadastro_id: string
          chave_tipo: string
          chave_valor: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          cadastro_id?: string
          chave_tipo?: string
          chave_valor?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produto_mapeamento_cadastro_id_fkey"
            columns: ["cadastro_id"]
            isOneToOne: false
            referencedRelation: "cadastro_tributario"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos_impostograma: {
        Row: {
          cest: string | null
          codigo_produto: string | null
          created_at: string | null
          dados_completos: Json | null
          dados_normalizados: Json
          descricao: string | null
          ean: string | null
          empresa_id: string
          id: string
          ncm: string
          updated_at: string | null
        }
        Insert: {
          cest?: string | null
          codigo_produto?: string | null
          created_at?: string | null
          dados_completos?: Json | null
          dados_normalizados: Json
          descricao?: string | null
          ean?: string | null
          empresa_id: string
          id?: string
          ncm: string
          updated_at?: string | null
        }
        Update: {
          cest?: string | null
          codigo_produto?: string | null
          created_at?: string | null
          dados_completos?: Json | null
          dados_normalizados?: Json
          descricao?: string | null
          ean?: string | null
          empresa_id?: string
          id?: string
          ncm?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_impostograma_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
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
          last_selected_empresa_id: string | null
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
          last_selected_empresa_id?: string | null
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
          last_selected_empresa_id?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_last_selected_empresa_id_fkey"
            columns: ["last_selected_empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      rc_clientes: {
        Row: {
          ativo: boolean
          cnpj: string
          created_at: string
          id: string
          is_admin: boolean
          nome: string
          senha_hash: string
        }
        Insert: {
          ativo?: boolean
          cnpj: string
          created_at?: string
          id?: string
          is_admin?: boolean
          nome: string
          senha_hash: string
        }
        Update: {
          ativo?: boolean
          cnpj?: string
          created_at?: string
          id?: string
          is_admin?: boolean
          nome?: string
          senha_hash?: string
        }
        Relationships: []
      }
      rc_clients: {
        Row: {
          active: boolean | null
          cnpj: string
          created_at: string | null
          id: string
          is_admin: boolean | null
          name: string
          password_hash: string
        }
        Insert: {
          active?: boolean | null
          cnpj: string
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          name: string
          password_hash: string
        }
        Update: {
          active?: boolean | null
          cnpj?: string
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          name?: string
          password_hash?: string
        }
        Relationships: []
      }
      rc_invoices: {
        Row: {
          chave: string | null
          client_cnpj: string
          cnpj_dest: string | null
          created_at: string | null
          created_by: string | null
          destinatario: string | null
          emission_date: string | null
          id: string
          nf_number: string | null
          nf_type: string | null
          notes: string | null
          serie: string | null
          value: number | null
        }
        Insert: {
          chave?: string | null
          client_cnpj: string
          cnpj_dest?: string | null
          created_at?: string | null
          created_by?: string | null
          destinatario?: string | null
          emission_date?: string | null
          id?: string
          nf_number?: string | null
          nf_type?: string | null
          notes?: string | null
          serie?: string | null
          value?: number | null
        }
        Update: {
          chave?: string | null
          client_cnpj?: string
          cnpj_dest?: string | null
          created_at?: string | null
          created_by?: string | null
          destinatario?: string | null
          emission_date?: string | null
          id?: string
          nf_number?: string | null
          nf_type?: string | null
          notes?: string | null
          serie?: string | null
          value?: number | null
        }
        Relationships: []
      }
      rc_notas: {
        Row: {
          chave_acesso: string | null
          cnpj_dest: string | null
          cnpj_emitente: string
          created_at: string
          data_emissao: string
          destinatario: string | null
          id: string
          importado_por: string | null
          nome_emitente: string
          numero_nf: string
          observacoes: string | null
          serie: string | null
          tipo_nf: string
          valor: number
        }
        Insert: {
          chave_acesso?: string | null
          cnpj_dest?: string | null
          cnpj_emitente: string
          created_at?: string
          data_emissao: string
          destinatario?: string | null
          id?: string
          importado_por?: string | null
          nome_emitente: string
          numero_nf: string
          observacoes?: string | null
          serie?: string | null
          tipo_nf?: string
          valor: number
        }
        Update: {
          chave_acesso?: string | null
          cnpj_dest?: string | null
          cnpj_emitente?: string
          created_at?: string
          data_emissao?: string
          destinatario?: string | null
          id?: string
          importado_por?: string | null
          nome_emitente?: string
          numero_nf?: string
          observacoes?: string | null
          serie?: string | null
          tipo_nf?: string
          valor?: number
        }
        Relationships: []
      }
      rc_payments: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string | null
          date: string
          id: string
          installment: string | null
          invoice_id: string
          method: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by?: string | null
          date: string
          id?: string
          installment?: string | null
          invoice_id: string
          method?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          installment?: string | null
          invoice_id?: string
          method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rc_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "rc_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      rc_recebimentos: {
        Row: {
          created_at: string
          data_recebimento: string
          forma_pagamento: string
          id: string
          nota_id: string
          observacoes: string | null
          parcela: string | null
          registrado_por: string | null
          valor: number
        }
        Insert: {
          created_at?: string
          data_recebimento: string
          forma_pagamento?: string
          id?: string
          nota_id: string
          observacoes?: string | null
          parcela?: string | null
          registrado_por?: string | null
          valor: number
        }
        Update: {
          created_at?: string
          data_recebimento?: string
          forma_pagamento?: string
          id?: string
          nota_id?: string
          observacoes?: string | null
          parcela?: string | null
          registrado_por?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "rc_recebimentos_nota_id_fkey"
            columns: ["nota_id"]
            isOneToOne: false
            referencedRelation: "rc_notas"
            referencedColumns: ["id"]
          },
        ]
      }
      regras_entrada: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          empresa_id: string
          id: string
          nome: string | null
          regras: Json
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id: string
          id?: string
          nome?: string | null
          regras?: Json
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id?: string
          id?: string
          nome?: string | null
          regras?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regras_entrada_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      relatorios_entradas: {
        Row: {
          acumulador_rules: Json | null
          created_at: string
          empresa_id: string
          id: string
          nome: string
          periodo: string
          row_count: number
          stats: Json
          total_impostos: number | null
          total_vnf: number | null
          total_vprod: number | null
          usuario_id: string
        }
        Insert: {
          acumulador_rules?: Json | null
          created_at?: string
          empresa_id: string
          id?: string
          nome: string
          periodo: string
          row_count?: number
          stats?: Json
          total_impostos?: number | null
          total_vnf?: number | null
          total_vprod?: number | null
          usuario_id: string
        }
        Update: {
          acumulador_rules?: Json | null
          created_at?: string
          empresa_id?: string
          id?: string
          nome?: string
          periodo?: string
          row_count?: number
          stats?: Json
          total_impostos?: number | null
          total_vnf?: number | null
          total_vprod?: number | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relatorios_entradas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      relatorios_estrategicos: {
        Row: {
          cfop_summaries: Json
          created_at: string
          empresa_id: string
          entrada_saida_balance: Json
          id: string
          ncm_summaries: Json
          nome: string
          periodo: string
          resumo_impostos: Json
          total_itens: number
          total_notas: number
          total_notas_entrada: number
          total_notas_saida: number
          total_vnf: number
          total_vprod: number
          usuario_id: string
        }
        Insert: {
          cfop_summaries?: Json
          created_at?: string
          empresa_id: string
          entrada_saida_balance?: Json
          id?: string
          ncm_summaries?: Json
          nome: string
          periodo: string
          resumo_impostos?: Json
          total_itens?: number
          total_notas?: number
          total_notas_entrada?: number
          total_notas_saida?: number
          total_vnf?: number
          total_vprod?: number
          usuario_id: string
        }
        Update: {
          cfop_summaries?: Json
          created_at?: string
          empresa_id?: string
          entrada_saida_balance?: Json
          id?: string
          ncm_summaries?: Json
          nome?: string
          periodo?: string
          resumo_impostos?: Json
          total_itens?: number
          total_notas?: number
          total_notas_entrada?: number
          total_notas_saida?: number
          total_vnf?: number
          total_vprod?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relatorios_estrategicos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      relatorios_saidas: {
        Row: {
          acumulador_rules: Json | null
          created_at: string | null
          empresa_id: string | null
          id: string
          nome: string
          periodo: string
          row_count: number
          stats: Json
          total_impostos: number | null
          total_vnf: number | null
          total_vprod: number | null
          usuario_id: string | null
        }
        Insert: {
          acumulador_rules?: Json | null
          created_at?: string | null
          empresa_id?: string | null
          id?: string
          nome: string
          periodo: string
          row_count?: number
          stats?: Json
          total_impostos?: number | null
          total_vnf?: number | null
          total_vprod?: number | null
          usuario_id?: string | null
        }
        Update: {
          acumulador_rules?: Json | null
          created_at?: string | null
          empresa_id?: string | null
          id?: string
          nome?: string
          periodo?: string
          row_count?: number
          stats?: Json
          total_impostos?: number | null
          total_vnf?: number | null
          total_vprod?: number | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "relatorios_saidas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      rubrica_configs: {
        Row: {
          active: boolean
          code: string
          created_at: string | null
          description: string
          dia_pagamento: number | null
          id: string
          incide_fgts: boolean
          incide_inss: boolean
          incide_irrf: boolean
          is_engine_generated: boolean
          notes: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string | null
          description: string
          dia_pagamento?: number | null
          id?: string
          incide_fgts?: boolean
          incide_inss?: boolean
          incide_irrf?: boolean
          is_engine_generated?: boolean
          notes?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string | null
          description?: string
          dia_pagamento?: number | null
          id?: string
          incide_fgts?: boolean
          incide_inss?: boolean
          incide_irrf?: boolean
          is_engine_generated?: boolean
          notes?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      salary_family_brackets: {
        Row: {
          created_at: string
          id: string
          max_salary: number
          valid_from: string
          valid_until: string | null
          value_per_dependent: number
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          max_salary: number
          valid_from: string
          valid_until?: string | null
          value_per_dependent: number
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          max_salary?: number
          valid_from?: string
          valid_until?: string | null
          value_per_dependent?: number
          year?: number
        }
        Relationships: []
      }
      termination_records: {
        Row: {
          aviso_previo_dias: number | null
          aviso_previo_tipo: string | null
          aviso_previo_valor: number | null
          created_at: string
          data_demissao: string
          decimo_terceiro_proporcional: number | null
          employee_id: string
          ferias_proporcionais: number | null
          ferias_vencidas: number | null
          id: string
          multa_fgts: number | null
          payroll_entry_id: string | null
          saldo_salario: number | null
          status: string | null
          terco_ferias: number | null
          tipo_demissao: string
          total_descontos: number | null
          total_proventos: number | null
          updated_at: string
          valor_liquido: number | null
        }
        Insert: {
          aviso_previo_dias?: number | null
          aviso_previo_tipo?: string | null
          aviso_previo_valor?: number | null
          created_at?: string
          data_demissao: string
          decimo_terceiro_proporcional?: number | null
          employee_id: string
          ferias_proporcionais?: number | null
          ferias_vencidas?: number | null
          id?: string
          multa_fgts?: number | null
          payroll_entry_id?: string | null
          saldo_salario?: number | null
          status?: string | null
          terco_ferias?: number | null
          tipo_demissao: string
          total_descontos?: number | null
          total_proventos?: number | null
          updated_at?: string
          valor_liquido?: number | null
        }
        Update: {
          aviso_previo_dias?: number | null
          aviso_previo_tipo?: string | null
          aviso_previo_valor?: number | null
          created_at?: string
          data_demissao?: string
          decimo_terceiro_proporcional?: number | null
          employee_id?: string
          ferias_proporcionais?: number | null
          ferias_vencidas?: number | null
          id?: string
          multa_fgts?: number | null
          payroll_entry_id?: string | null
          saldo_salario?: number | null
          status?: string | null
          terco_ferias?: number | null
          tipo_demissao?: string
          total_descontos?: number | null
          total_proventos?: number | null
          updated_at?: string
          valor_liquido?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "termination_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "termination_records_payroll_entry_id_fkey"
            columns: ["payroll_entry_id"]
            isOneToOne: false
            referencedRelation: "payroll_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      thirteenth_salary_records: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          meses_trabalhados: number
          payroll_entry_first_id: string | null
          payroll_entry_second_id: string | null
          reference_year: number
          status: string | null
          updated_at: string
          valor_inss: number | null
          valor_integral: number
          valor_irrf: number | null
          valor_liquido: number | null
          valor_primeira_parcela: number | null
          valor_segunda_parcela: number | null
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          meses_trabalhados: number
          payroll_entry_first_id?: string | null
          payroll_entry_second_id?: string | null
          reference_year: number
          status?: string | null
          updated_at?: string
          valor_inss?: number | null
          valor_integral: number
          valor_irrf?: number | null
          valor_liquido?: number | null
          valor_primeira_parcela?: number | null
          valor_segunda_parcela?: number | null
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          meses_trabalhados?: number
          payroll_entry_first_id?: string | null
          payroll_entry_second_id?: string | null
          reference_year?: number
          status?: string | null
          updated_at?: string
          valor_inss?: number | null
          valor_integral?: number
          valor_irrf?: number | null
          valor_liquido?: number | null
          valor_primeira_parcela?: number | null
          valor_segunda_parcela?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "thirteenth_salary_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thirteenth_salary_records_payroll_entry_first_id_fkey"
            columns: ["payroll_entry_first_id"]
            isOneToOne: false
            referencedRelation: "payroll_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thirteenth_salary_records_payroll_entry_second_id_fkey"
            columns: ["payroll_entry_second_id"]
            isOneToOne: false
            referencedRelation: "payroll_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_departments: {
        Row: {
          created_at: string
          department_id: string
          id: string
          is_primary: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          department_id: string
          id?: string
          is_primary?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          department_id?: string
          id?: string
          is_primary?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_departments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_departments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      usuario_empresas: {
        Row: {
          created_at: string | null
          empresa_id: string
          id: string
          papel: string | null
          usuario_id: string
        }
        Insert: {
          created_at?: string | null
          empresa_id: string
          id?: string
          papel?: string | null
          usuario_id: string
        }
        Update: {
          created_at?: string | null
          empresa_id?: string
          id?: string
          papel?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_empresas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      vacation_records: {
        Row: {
          created_at: string
          data_fim: string
          data_inicio: string
          dias_abono: number | null
          dias_gozo: number
          employee_id: string
          id: string
          payroll_entry_id: string | null
          periodo_aquisitivo_fim: string
          periodo_aquisitivo_inicio: string
          status: string | null
          updated_at: string
          valor_abono: number | null
          valor_ferias: number | null
          valor_inss: number | null
          valor_irrf: number | null
          valor_liquido: number | null
          valor_terco: number | null
        }
        Insert: {
          created_at?: string
          data_fim: string
          data_inicio: string
          dias_abono?: number | null
          dias_gozo?: number
          employee_id: string
          id?: string
          payroll_entry_id?: string | null
          periodo_aquisitivo_fim: string
          periodo_aquisitivo_inicio: string
          status?: string | null
          updated_at?: string
          valor_abono?: number | null
          valor_ferias?: number | null
          valor_inss?: number | null
          valor_irrf?: number | null
          valor_liquido?: number | null
          valor_terco?: number | null
        }
        Update: {
          created_at?: string
          data_fim?: string
          data_inicio?: string
          dias_abono?: number | null
          dias_gozo?: number
          employee_id?: string
          id?: string
          payroll_entry_id?: string | null
          periodo_aquisitivo_fim?: string
          periodo_aquisitivo_inicio?: string
          status?: string | null
          updated_at?: string
          valor_abono?: number | null
          valor_ferias?: number | null
          valor_inss?: number | null
          valor_irrf?: number | null
          valor_liquido?: number | null
          valor_terco?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vacation_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vacation_records_payroll_entry_id_fkey"
            columns: ["payroll_entry_id"]
            isOneToOne: false
            referencedRelation: "payroll_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      veiculos: {
        Row: {
          ano_fabricacao: number
          ano_modelo: number
          cambio: string
          combustivel: string
          cor: string
          created_at: string | null
          data_compra: string | null
          data_venda: string | null
          descricao: string | null
          fotos: string[] | null
          icms_aliquota: number | null
          icms_base: number | null
          icms_cst: string | null
          icms_valor: number | null
          id: string
          marca: string
          modelo: string
          nf_entrada: string | null
          nf_entrada_pdf: string | null
          nf_saida: string | null
          nf_saida_pdf: string | null
          placa: string
          preco_compra: number
          preco_venda: number | null
          quilometragem: number
          status: string
          updated_at: string | null
        }
        Insert: {
          ano_fabricacao: number
          ano_modelo: number
          cambio?: string
          combustivel?: string
          cor: string
          created_at?: string | null
          data_compra?: string | null
          data_venda?: string | null
          descricao?: string | null
          fotos?: string[] | null
          icms_aliquota?: number | null
          icms_base?: number | null
          icms_cst?: string | null
          icms_valor?: number | null
          id?: string
          marca: string
          modelo: string
          nf_entrada?: string | null
          nf_entrada_pdf?: string | null
          nf_saida?: string | null
          nf_saida_pdf?: string | null
          placa: string
          preco_compra?: number
          preco_venda?: number | null
          quilometragem?: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          ano_fabricacao?: number
          ano_modelo?: number
          cambio?: string
          combustivel?: string
          cor?: string
          created_at?: string | null
          data_compra?: string | null
          data_venda?: string | null
          descricao?: string | null
          fotos?: string[] | null
          icms_aliquota?: number | null
          icms_base?: number | null
          icms_cst?: string | null
          icms_valor?: number | null
          id?: string
          marca?: string
          modelo?: string
          nf_entrada?: string | null
          nf_entrada_pdf?: string | null
          nf_saida?: string | null
          nf_saida_pdf?: string | null
          placa?: string
          preco_compra?: number
          preco_venda?: number | null
          quilometragem?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_gf_invoice:
        | {
            Args: {
              p_additional_data?: string
              p_client_id: string
              p_company_id: string
              p_due_date?: string
              p_installments?: Json
              p_invoice_number?: number
              p_issue_date?: string
              p_items?: Json
              p_lease_id?: string
              p_num_installments?: number
              p_payment_condition?: string
              p_payment_method?: string
              p_total_value?: number
              p_user_id?: string
              p_value_in_words?: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_additional_data?: string
              p_bank_account?: Json
              p_client_id: string
              p_company_id: string
              p_due_date?: string
              p_installments?: Json
              p_invoice_number?: number
              p_issue_date?: string
              p_items?: Json
              p_lease_id?: string
              p_num_installments?: number
              p_payment_condition?: string
              p_payment_method?: string
              p_total_value?: number
              p_user_id?: string
              p_value_in_words?: string
            }
            Returns: Json
          }
      has_financial_access: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_authenticated_profile: { Args: never; Returns: boolean }
      user_has_access_to_empresa: {
        Args: { p_empresa_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "viewer" | "director" | "employee" | "financial_staff"
      checklist_item_status: "pending" | "in_progress" | "completed" | "skipped"
      client_status: "onboarding" | "active" | "inactive" | "suspended"
      department_slug:
        | "fiscal"
        | "contabil"
        | "pessoal"
        | "financeiro"
        | "legalizacao"
      event_type:
        | "meeting"
        | "phone_call"
        | "email"
        | "document_sent"
        | "document_received"
        | "issue"
        | "resolution"
        | "observation"
        | "onboarding_step"
        | "other"
      onboarding_target:
        | "pj_simples"
        | "pj_presumido"
        | "pj_real"
        | "pf"
        | "mei"
      person_type: "pf" | "pj"
      recurrence_type: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "overdue"
        | "cancelled"
      tax_regime: "simples_nacional" | "lucro_presumido" | "lucro_real" | "mei"
      user_role: "admin" | "manager" | "collaborator"
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
      checklist_item_status: ["pending", "in_progress", "completed", "skipped"],
      client_status: ["onboarding", "active", "inactive", "suspended"],
      department_slug: [
        "fiscal",
        "contabil",
        "pessoal",
        "financeiro",
        "legalizacao",
      ],
      event_type: [
        "meeting",
        "phone_call",
        "email",
        "document_sent",
        "document_received",
        "issue",
        "resolution",
        "observation",
        "onboarding_step",
        "other",
      ],
      onboarding_target: ["pj_simples", "pj_presumido", "pj_real", "pf", "mei"],
      person_type: ["pf", "pj"],
      recurrence_type: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      task_priority: ["low", "medium", "high", "urgent"],
      task_status: [
        "pending",
        "in_progress",
        "completed",
        "overdue",
        "cancelled",
      ],
      tax_regime: ["simples_nacional", "lucro_presumido", "lucro_real", "mei"],
      user_role: ["admin", "manager", "collaborator"],
    },
  },
} as const
