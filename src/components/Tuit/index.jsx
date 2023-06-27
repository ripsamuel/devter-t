import { useState } from "react";
import Button from "../Button";
import { addDevit } from "../../firebase/firebase";

export default function Tuit(props) {
  const [message, setMessage] = useState("");
  console.log(props);
  const { uid, displayName, photoURL } = props.user;
  console.log(uid, displayName, photoURL);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addDevit({
      userId: uid,
      userName: displayName,
      avatar: photoURL,
    });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        value={message}
        placeholder="¿Que esta pasando ?"
      ></textarea>
      <div>
        <Button disabled={!message.length}>Devtear</Button>
      </div>
    </form>
  );
}
