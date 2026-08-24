import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import type { LoginFormValues } from "../types/LoginFormValues";
import type { LoginLocationState } from "../types/LoginLocationState";

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data: LoginFormValues) => {
        login.mutate(data, {
            onSuccess: () => {
                const state = location.state as LoginLocationState | null;

                const from = state?.from ?? {
                    pathname: "/home",
                };

                navigate(from, {
                    replace: true,
                });
            },
        });
    };

    return <></>;
}
