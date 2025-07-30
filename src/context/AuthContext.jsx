import { createContext , useEffect , useState , useContext } from "react";
import { supabase } from "../supabaseClient"; 
const AuthContext = createContext();
//un fel de observer pentru toata aplicaita
export const AuthContextProvider = ({ children }) => {
    const [session , setSession] = useState(undefined)


    //PENTRU Sign Up
    const signUpNewUser = async () => {
       const {data , error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if(error) {
            console.error("Error signing up:", error);
            return {succes : false , error};
        }

        return {succes : true , data};
    }

    //PENTRU Sign In
    const signInUser = async ({email , password}) => {
        try {
            const {data , error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if(error){
                console.error("Error signing in:", error);
                return {succes : false , error: error.message};
            }

            console.log("User signed in:", data);
            return {succes : true , data};
        } catch(error) {
            console.error("Error signing in:", error);
        }
    }


    useEffect(() => {
        supabase.auth.getSession().then(({data : {session}}) => {
        setSession(session);
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

    },[])


    //PENTRU Sign out
    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if(error) {
            console.error("Error signing out:", error);
        }
    }





    return (
        <AuthContext.Provider value = {{session , signUpNewUser , signOut}}>
            {children}
        </AuthContext.Provider>
    );
};


export const UserAuth =() => {
    return useContext(AuthContext);
}