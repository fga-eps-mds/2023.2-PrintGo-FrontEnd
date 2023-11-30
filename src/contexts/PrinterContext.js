import React from "react";

const PrinterContext = React.createContext();

function usePrinter() {
  const [printer, setPrinter] = useState(null);

  return {
    printer,
    setPrinter,
  };
}

export default PrinterContext;