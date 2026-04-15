
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/login" | "/api" | "/api/admin" | "/api/admin/admins" | "/api/admin/global-exams" | "/api/admin/login" | "/api/admin/passkey" | "/api/admin/passkey/login" | "/api/admin/passkey/login/options" | "/api/admin/passkey/login/verify" | "/api/admin/passkey/options" | "/api/admin/passkey/verify" | "/api/admin/users" | "/api/auth" | "/api/auth/login" | "/api/auth/login/options" | "/api/auth/login/verify" | "/api/auth/registration" | "/api/auth/registration/options" | "/api/auth/registration/verify" | "/api/auth/session" | "/api/global-exams" | "/api/upload" | "/api/user" | "/api/user/data";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/api": Record<string, never>;
			"/api/admin": Record<string, never>;
			"/api/admin/admins": Record<string, never>;
			"/api/admin/global-exams": Record<string, never>;
			"/api/admin/login": Record<string, never>;
			"/api/admin/passkey": Record<string, never>;
			"/api/admin/passkey/login": Record<string, never>;
			"/api/admin/passkey/login/options": Record<string, never>;
			"/api/admin/passkey/login/verify": Record<string, never>;
			"/api/admin/passkey/options": Record<string, never>;
			"/api/admin/passkey/verify": Record<string, never>;
			"/api/admin/users": Record<string, never>;
			"/api/auth": Record<string, never>;
			"/api/auth/login": Record<string, never>;
			"/api/auth/login/options": Record<string, never>;
			"/api/auth/login/verify": Record<string, never>;
			"/api/auth/registration": Record<string, never>;
			"/api/auth/registration/options": Record<string, never>;
			"/api/auth/registration/verify": Record<string, never>;
			"/api/auth/session": Record<string, never>;
			"/api/global-exams": Record<string, never>;
			"/api/upload": Record<string, never>;
			"/api/user": Record<string, never>;
			"/api/user/data": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/login" | "/api/admin/admins" | "/api/admin/global-exams" | "/api/admin/login" | "/api/admin/passkey/login/options" | "/api/admin/passkey/login/verify" | "/api/admin/passkey/options" | "/api/admin/passkey/verify" | "/api/admin/users" | "/api/auth/login/options" | "/api/auth/login/verify" | "/api/auth/registration/options" | "/api/auth/registration/verify" | "/api/auth/session" | "/api/global-exams" | "/api/upload" | "/api/user/data";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/apaes.svg" | "/file.svg" | "/globe.svg" | "/next.svg" | "/vercel.svg" | "/window.svg" | string & {};
	}
}