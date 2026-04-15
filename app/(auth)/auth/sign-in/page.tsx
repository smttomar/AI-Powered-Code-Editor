import React from "react";
import Image from "next/image";
import SignInFormClient from "@/modules/auth/components/sign-in-form-client";
import Reveal from "@/components/providers/reveal";

const SignInPage = () => {
    return (
        <>
            <Reveal>
                <Image
                    src={"/login.svg"}
                    alt="Login-Image"
                    height={300}
                    width={300}
                    className="m-6 object-cover"
                />
            </Reveal>
            <SignInFormClient />
        </>
    );
};

export default SignInPage;
