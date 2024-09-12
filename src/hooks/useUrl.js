import { useLocation } from "react-router-dom";

function useUrl() {
  const windowUrl = useLocation().pathname;
  return windowUrl;
}

export default useUrl;
