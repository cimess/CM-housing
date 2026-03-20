import LoginComponent from "@/full-Component/login";

export default function Login(){
   return(
    <div className="flex justify-center items-center h-screen">
      <LoginComponent header='Login as Admin' path="/cimessadmin" showRegAndLogin={false} />
    </div>
   )
};


