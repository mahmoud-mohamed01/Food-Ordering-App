import { createContext, useState } from "react";

let UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckOut() {
    setUserProgress("checkout");
  }
  function hideCheckOut() {
    setUserProgress("");
  }

  let UserProgressCtxt = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
  };

  console.log("progress:" + userProgress);
  return (
    <UserProgressContext.Provider value={UserProgressCtxt}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
