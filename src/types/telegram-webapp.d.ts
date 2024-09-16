declare global {
	interface Window {
	  Telegram: {
		WebApp: {
		  initData: string;
		  initDataUnsafe: {
			query_id: string;
			user?: {
			  id: number;
			  first_name: string;
			  last_name?: string;
			  username?: string;
			  language_code?: string;
			};
		  };
		  close: () => void;
		  ready: () => void;
		};
	  };
	}
  }
  
  export {};