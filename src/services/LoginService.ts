import { SERVICE_HOST } from "./constants";
import { LoginClient } from "../generated/LoginServiceClientPb";
import { LoginRequest, GoogleLoginRequest } from "../generated/login_pb";

var loginClient = new LoginClient(SERVICE_HOST);

function IsLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
}

async function Login(email: string, password: string) : Promise<boolean> {
    var request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);

    var res = await loginClient.login(request, {});
    localStorage.setItem('token', res.getJwt());

    return true;
}

async function LoginWithGoogle(token: string) : Promise<boolean> {
    var req = new GoogleLoginRequest();
    req.setIdToken(token);

    var res = await loginClient.loginWithGoogle(req, {});
    localStorage.setItem('token', res.getJwt());

    return true;
}

function Logout() {
    localStorage.removeItem('token');
    return true;
}

export { IsLoggedIn, Login, LoginWithGoogle, Logout };