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
			  is_premium?: boolean;
			allows_write_to_pm?: boolean;
			};
		  };
		  close: () => void;
		  ready: () => void;
		  onEvent: (eventType, eventHandler) => void;
		  offEvent: (eventType, eventHandler) => void;
		};
	  };
	}
  }
  
  export {};