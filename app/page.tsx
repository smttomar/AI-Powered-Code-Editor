import { Button } from "@/components/ui/button";
import UserButton from "@/modules/auth/components/user-button";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Button className="hover:cursor-pointer hover:scale-105">
                Start
            </Button>
            <div className="absolute top-4 right-4">
                <UserButton />
            </div>
        </div>
    );
}
