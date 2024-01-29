import { GoogleLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { environment } from "src/environments/environment";

export const SocialAuthConfig = [
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: false, //keeps the user signed in
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID)
                }
            ],
            onError: (err) => {
                console.error(err);
            },
        } as SocialAuthServiceConfig,
    }
]