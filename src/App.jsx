
import './App.css'
import GitHub from './assets/GitHub';
import { GithubAuth } from "./firebase/firebase";
import  Button  from "./components/Button";
import  AppLayout  from "./components/AppLayout";
import { useState } from 'react';



function App() {
    const [user, setUser] = useState(null)

    const GithubLogIn = async () => {
      try {
        const user = await GithubAuth();
        const { avatar, username, url } = user
        setUser(user);
        console.log(user);
        console.log(setUser)
      } catch (error) {
        console.log(error);
      }
    };
    


  return (
    <>
      <AppLayout>
        <section className='grid justify-center place-items-center'>
        <img className='w-24 h-24 mt-6 mb-4' src='/devter-logo.png' alt='Logo'/>
        <h1 className=' font-bold text-blue-400'>Devter</h1>
        <h2 className='font-bold text-blue-300'>¡ Habla sobre programacion con programadores : !</h2>
        <h1>this is the home </h1>

        <div>

          { user === null &&
            <Button onClick={GithubLogIn}>
              <GitHub fill='#fff' width={24} height={24} />
              Registrate ocn Github
            </Button>
          }
        </div>
       </section>
      </AppLayout>
    </>
  )
}

export default App
