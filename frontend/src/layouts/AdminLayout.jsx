import Sidebar from "../components/Sidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout({children}){

    return(

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar/>

            <div className="flex-1">

                <AdminHeader/>

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}