import { useState, useEffect, useCallback } from "react";

// returns the current hash location (excluding the '#' symbol)
const currentLocation = () => {
  return window.location.hash.replace("#", "") || "/";
}

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  const onHashAddressChange = () => {
    setLoc(currentLocation())
  };

  useEffect(() => {
    
    // subscribe on hash changes
    window.addEventListener("hashchange", onHashAddressChange);
    return () => window.removeEventListener("hashchange", onHashAddressChange);
  }, []);

  const navigate = useCallback(to => (window.location.hash = to), []);
  return [loc, navigate] as any;
};

export default useHashLocation;