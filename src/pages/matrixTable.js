import React, { useState, useEffect } from "react";
import Invoice from "../components/invoice";

function MatrixTableMain({ ordersData }) {
  return (
    <div>
      <h1>Orders Data:</h1>
      <pre>{JSON.stringify(ordersData, null, 2)}</pre>
    </div>
  );
}

export default MatrixTableMain;
