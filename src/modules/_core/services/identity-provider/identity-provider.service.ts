export interface IIdentityProviderService {
  /**
   * Fetches user information from the external identity provider.
   * @param authId The unique user ID (e.g. sub in JWT).
   * @returns Promise resolving to UserInfo object.
   */
  getUserInfo(authId: string): Promise<UserInfo>;
}

export class UserInfo {
  authId: string; // The unique user ID (e.g., Cognito ID sub in JWT)
  email?: string; // User email, if available
  username?: string; // Username (currently Cognito returns ID sub in JWT)

  constructor(data: Partial<UserInfo>) {
    Object.assign(this, data);
  }
}
