import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

export const SearchInputWidget = () => {
  let navigate = useNavigate();

  const [inputValue, setInputValue] = React.useState("");
  const [isFocus, toggleFocus] = React.useState(false);

  const onBlur = React.useCallback(() => {
    toggleFocus(false);
  }, []);
  const onFocus = React.useCallback(() => {
    toggleFocus(true);
  }, []);

  const onKeyPress = React.useCallback(
    (e) => {
      if (e.charCode === 13) {
        console.log(e, inputValue);

        navigate({
          pathname: `/search`,
          search: `?text=${inputValue}`,
        });
      }
    },
    [inputValue]
  );

  return (
    <div
      className={cx("search", {
        "search--active": isFocus,
      })}
    >
      <TextField
        className="search__input"
        label="Поищем..."
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth={true}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className="extra-border outer-border"></div>
      <div className="extra-border inner-border"></div>
    </div>
  );
};
