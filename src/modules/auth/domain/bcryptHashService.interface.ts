export interface IHashService {
  compare(plain: string, hashed: string): Promise<boolean>;
}
