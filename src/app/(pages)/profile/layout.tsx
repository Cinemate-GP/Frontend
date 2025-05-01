import ProfileHeader from "@/components/profile/ProfileHeader"
import Tabs from "@/components/profile/Tabs"

const ProfileLayout = ({children}:{children:React.ReactNode}) => {
    return(
        <div className="relative pt-24 pb-16 px-4 sm:px-6 md:px-8">
            {/* Background decorative elements */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-black to-transparent"></div>
                <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute left-0 w-[30vw] h-full bg-gradient-to-r from-black to-transparent"></div>
                <div className="absolute right-0 w-[30vw] h-full bg-gradient-to-l from-black to-transparent"></div>
                <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-red-900/5 blur-3xl"></div>
                <div className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full bg-red-900/5 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <ProfileHeader />
                <Tabs/>
                <div className="mt-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout