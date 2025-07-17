export interface IFilter {
  selected_field?: string[];
  join_table?: {
    table_name: string,
    on_condition: string,
    on_value: string
  }[];
  search?: {
    field: string,
    value: string,
    operator: string
  }[];
  sort_by?: string;
  sort_order?: string;
}
