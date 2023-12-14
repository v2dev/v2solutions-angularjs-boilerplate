import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { environment } from "@environments/environment.development";

export const SocialAuthServiceData = [
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: false, //keeps the user signed in
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID)
                }
            ]
        }
    }
]