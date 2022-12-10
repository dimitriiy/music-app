import React from "react";

export function useTextInput(defaultValue?: string) {
  const [value, setInputValue] = React.useState(defaultValue ?? "");

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );
  return {
    value,
    onChange,
  };
}
