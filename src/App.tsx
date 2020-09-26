import React from "react";

const potato = new Promise<string>((resolve) =>
  setTimeout(() => resolve("asdf"), 1000)
);

export const App = () => {
  const [text, setText] = React.useState<string | null>(null);

  React.useEffect(() => {
    potato.then((text) => setText(text));
  }, []);

  return <div>hello my name is {text}</div>;
};
