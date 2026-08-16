import { loginUser, logoutUser} from "../api/auth.api.js";
import { createContext , useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [user, setUser] = useState(null);

    const login = async (Credentials) => {
        const data = await loginUser(Credentials);

        setUser(data.data.user);

        return data;
    }

    const logout = async() => {
        await logoutUser();

        setUser(null);
    }

    return (
        <AuthContext.Provider
        value={{
            user,
            login,
            logout,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;