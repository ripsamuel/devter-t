import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import { GithubAuth, checkAuth } from "../../firebase/firebase";
import GitHub from "../../assets/GitHub";
import Button from "../../components/Button";
import Tuit from "../../components/Tuit";
// import { NavLink } from "react-router-dom";




export default function Home() {
    const [user, setUser] = useState(null);

useEffect(() => {
  console.log(setUser)
  checkAuth(setUser)
}, []);

const GithubLogIn = async () => {
  try {
    const user = await GithubAuth();
    setUser(user);
    console.log(user);
    console.log(setUser);
  } catch (error) {
    console.log(error);
  }
};

return (
  <>
      <AppLayout>
        <section className="grid justify-center place-items-center">
          <img
            className="w-24 h-24 mt-6 mb-4"
            src="/devter-logo.png"
            alt="Logo"
          />
          <h1 className=" font-bold text-blue-400">Devter</h1>
          <h2 className="font-bold text-blue-300">
            ¡ Habla sobre programacion con programadores : !
          </h2>

          <div>
            {user === null ? (
              <Button onClick={GithubLogIn}>
                <GitHub fill="#fff" width={24} height={24} />
                Registrate ocn Github
              </Button>
            ) : (
              <div>
                <img src={user.avatar} />
                <strong>{user.username}</strong>
              </div>
            )}
            <div className="mt-20">
            <Tuit user={user} />
            </div>
          </div>

        </section>
      </AppLayout>
    </>
    )
}