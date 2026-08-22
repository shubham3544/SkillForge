import useAuth from "../hooks/useAuth";

function Dashboard() {

    const {user,logout} = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        }
        catch (error) {
            console.log(error);
         }
    }
    
    return (
        <div>
            <h1>SkilForge Dashboard</h1>
            <p>You are authenticated.</p>

            <p>
                Welcome, {user?.fullname};
            </p>

            <button 
            onClick={handleLogout}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white">
                Logout
            </button>
        </div>
    )
}
export default Dashboard;