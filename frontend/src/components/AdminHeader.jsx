export default function AdminHeader(){

    return(

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <div>

                <h1 className="text-2xl font-bold">

                    Admin Dashboard

                </h1>

                <p className="text-gray-500">

                    Manage your store

                </p>

            </div>

            <div className="flex items-center gap-3">

                <img

                    src="https://ui-avatars.com/api/?name=Admin"

                    className="w-10 h-10 rounded-full"

                />

                <div>

                    <p className="font-semibold">

                        Administrator

                    </p>

                </div>

            </div>

        </header>

    );

}