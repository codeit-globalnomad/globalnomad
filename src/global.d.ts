interface KakaoShareButtonOptions {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: {
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }[];
}

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Link: {
        sendDefault: (options: KakaoShareButtonOptions) => void;
      };
    };
    FB: {
      getLoginStatus: (callback: (response: FB.LoginStatusResponse) => void) => void;
      login: (callback: (response: FB.LoginResponse) => void) => void;
      ui: (params: FB.ShareParams, callback: (response: FB.ShareResponse) => void) => void;
    };
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
