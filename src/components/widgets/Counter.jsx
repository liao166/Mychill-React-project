import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>你點擊了{count}次</p>
      <button className="btn btn-secondary" onClick={() => setCount(count + 1)}>
        點我
      </button>
    </>
  );
};

export default Counter;
