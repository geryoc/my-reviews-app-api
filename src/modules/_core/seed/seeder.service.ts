export interface SeederService {
  seed(): Promise<void>;
  clear(): Promise<void>;
}
