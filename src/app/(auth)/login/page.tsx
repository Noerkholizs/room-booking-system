// import { redirect } from "next/navigation";
// import { getCurrent } from "@/features/auth/actions";

import { LoginCard } from "@/features/auth/components/login-card";

const SignInPage = () => {
    // const user = await getCurrent();

    // if (user) return redirect("/");
    
    return (
        <LoginCard />
    );
};
export default SignInPage
