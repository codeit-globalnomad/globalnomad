declare global {
  interface Window {
    FB: {
      getLoginStatus: (callback: (response: FB.LoginStatusResponse) => void) => void;
      login: (callback: (response: FB.LoginResponse) => void) => void;
      ui: (params: FB.ShareParams, callback: (response: FB.ShareResponse) => void) => void;
    };
    kakao: typeof kakao;
  }
}

declare namespace FB {
  export interface LoginStatusResponse {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse?: LoginResponse;
  }

  export interface LoginResponse {
    authResponse: {
      accessToken: string;
      expiresIn: number;
      signedRequest: string;
      userID: string;
    };
  }

  export interface ShareResponse {
    error_message?: string;
    post_id?: string;
  }

  export interface ShareParams {
    method: 'share';
    href: string;
  }
}

export {};
