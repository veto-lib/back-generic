export interface Rule<T> {
  errorMessage: string;
  gravity: 'error' | 'warning';
  hooks: {
    type: T;
    test: (context: any) => string[] | void;
  }[];
}
