// types.d.ts

export interface Filter {
    type: 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals';
    value: string;
  }
  