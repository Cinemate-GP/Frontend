import ProfileHeader from "@/components/profile/ProfileHeader"
import Tabs from "@/components/profile/Tabs"

 const ProfileLayout = ({children}:{children:React.ReactNode}) => {
    return(
        <div className="mt-[6rem] section">
            <ProfileHeader />
            <Tabs/>
            {children}
        </div>
    )
}

export default ProfileLayout